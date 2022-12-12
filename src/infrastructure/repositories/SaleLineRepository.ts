import { Prisma, PrismaClient } from '@prisma/client';
import { Product } from '../domain/Product/Product';
import { Sale } from '../domain/Sale/Sale';
import { SaleLine } from '../domain/SaleLine/SaleLine';
import { ShoppingCart } from '../domain/ShopppingCart/ShoppingCart';

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

}