import { cartline as PrismaCartLine } from '@prisma/client';
import { Product } from '../domain/Product/Product';
import { SaleLine } from '../domain/SaleLine/SaleLine';


export class SaleLineFactory {
  static createFromPrisma(saleLine: PrismaCartLine, product: Product): SaleLine {
    return new SaleLine({
      amount: saleLine.amount,
      cart_sale_id: saleLine.shoppingCart_id,
      product, 
      supplierId: saleLine.supplier_id,
      batchId: saleLine.batch_id,
      price: saleLine.price,
      saleLineId: saleLine.cartLine_id,
      subTotal: saleLine.subtotal,
    });
  }

  static createManyFromPrismaWithSameProduct(saleLines: PrismaCartLine[], product: Product): SaleLine[] {
    return saleLines.map(saleLine => this.createFromPrisma(saleLine, product));
  }
}