import { Prisma, PrismaClient } from '@prisma/client';
import { Product } from '../domain/Product/Product';
import { Sale } from '../domain/Sale/Sale';
import { SaleLine } from '../domain/SaleLine/SaleLine';
import { Supplier } from '../domain/Supplier/Supplier';
import { SaleLineFactory } from '../factories/CartLineFactory';

export class SaleLineRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async createSaleLinesForSale(sale: Sale): Promise<boolean> {
    const databaseSaleLines = [];
    for (const saleLine of (sale.getSaleLines() as SaleLine[])) {
      const databaseSaleLine = await this.client.saleline.create({
        data: {
          amount: saleLine.snapshot.amount,
          batch_id: saleLine.snapshot.batchId as number,
          product_id: saleLine.snapshot.product.snapshot.id as number,
          sale_id: sale.snapshot.id as number,
          saleLine_id: saleLine.snapshot.saleLineId as number,
          supplier_id: saleLine.snapshot.supplierId,
          price: saleLine.snapshot.price,
          subtotal: saleLine.snapshot.subTotal,
        }
      });
      databaseSaleLines.push(databaseSaleLine);
    }
    return true;
  }

  async getTopNProducts(products: Product[], n: number = 0): 
    Promise<(Prisma.PickArray<Prisma.SalelineGroupByOutputType, "product_id"[]> & {
      _sum: {
        amount: number | null;
      };
    })[] | []> {
      
    if (!products.length) throw new Error('No products provided in getTopEightProducts');
    if(n == 0) throw new Error('N must be grater than zero');
    
    const ids: number[] = []
    products.forEach(product => {
      ids.push(product.snapshot.id as number);
    });

    const topProducts = await this.client.saleline.groupBy({
      _sum: {amount: true},
      by: ['product_id'],
      orderBy: {_sum: {amount: 'desc'}} ,
      having: {product_id: {in: ids}},
      take: 8
    });

    return topProducts;
  }

  async getSaleLinesBySale(saleId: number): Promise<SaleLine[] | null> {
    const databaseSaleLines = await this.client.saleline.findMany({
      where: {sale_id: saleId}
    });
    if (!databaseSaleLines) return null;
    const saleLines = [];
    for (const databseSaleLine of databaseSaleLines) {
      const databaseProduct = await this.client.product.findUnique({
        where: {id: databseSaleLine.product_id}
      });
      if (!databaseProduct) throw new Error('Sale lines has no product asigned');
      const databaseSupplier = await this.client.supplier.findUnique({where: {id: databseSaleLine.supplier_id}});
      const product = new Product({
        imageUrl: databaseProduct.imageUrl,
        name: databaseProduct.name,
        price: databaseProduct.price,
        id: databaseProduct.id,
        suppliers: [new Supplier({company: databaseSupplier?.company || '', id: databaseSupplier?.id})],
      })
      const saleLine = SaleLineFactory.createFromPrismaSale(databseSaleLine, product);
      saleLines.push(saleLine);
    }
    return saleLines;
  }

  async updateInventory(saleId: number, saleLineId:number): Promise<boolean> {
    const databaseLine = await this.client.saleline.findUnique({
      where: {sale_id_saleLine_id: {sale_id: saleId, saleLine_id: saleLineId}}
    });
    if (!databaseLine) throw new Error(`Sale line with id ${saleLineId} does not exist`);
    const databaseBatch = await this.client.batch.update({
      where: {product_id_supplier_id_batch_id: {batch_id: databaseLine?.batch_id, product_id: databaseLine?.product_id, supplier_id: databaseLine?.supplier_id}},
      data: {compromised: {decrement: databaseLine.amount}, actualStock: {decrement: databaseLine.amount}}
    });
    if (!databaseBatch) throw new Error(`batch with id ${databaseLine.batch_id} does not exist`);
    if (databaseBatch.onShelf > 0) this.client.batch.update({
      where: {product_id_supplier_id_batch_id: {batch_id: databaseLine?.batch_id, product_id: databaseLine?.product_id, supplier_id: databaseLine?.supplier_id}},
      data: {compromised: {decrement: databaseLine.amount}, actualStock: {decrement: databaseLine.amount}}
    });
    const databaseProduct = await this.client.product.update({
      where: {id: databaseLine.product_id}, data: {stock: {decrement: databaseLine.amount}}
    });
    if (!databaseProduct) throw new Error(`product with id ${databaseLine.product_id} does not exist`);
    const databaseSupplier = await this.client.productxsupplier.update({
      where: {product_id_supplier_id: {product_id: databaseLine.product_id, supplier_id: databaseLine.supplier_id}},
      data: {compromised: {decrement: databaseLine.amount}, stock: {decrement: databaseLine.amount}}
    });
    if (!databaseSupplier) throw new Error(`ProductxSupplier with id ${databaseLine.product_id}, ${databaseLine.supplier_id} does not exist`);
    return true;
  }

}