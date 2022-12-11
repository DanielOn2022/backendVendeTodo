import { PrismaClient } from '@prisma/client';
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
    console.log(sale);
    for (const saleLine of (sale.getSaleLines() as SaleLine[])) {
      console.log('dentro del create => ', saleLine);
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

}