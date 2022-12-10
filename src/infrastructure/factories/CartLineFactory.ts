import { cartline as PrismaCartLine } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
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

  static createFromNexus(nexusSaleLine: any): SaleLine {
    const product = nexusSaleLine?.product;
      const saleLineProduct = new Product({
        ...product, 
        price: product?.price as unknown as Decimal, 
        name: product?.name || '', 
        volume: product?.volume as unknown as Decimal, 
        imageUrl: product?.imageUrl || ''
      });
      return new SaleLine({
        price: nexusSaleLine?.price as unknown as Decimal,
        product: saleLineProduct,
        subTotal: nexusSaleLine?.subTotal as unknown as Decimal,
        amount: nexusSaleLine?.amount || 0,
        batchId: nexusSaleLine?.batchId || 0,
        cart_sale_id: nexusSaleLine?.cart_sale_id || 0,
        saleLineId: nexusSaleLine?.saleLineId || 0,
        supplierId: nexusSaleLine?.supplierId || 0
      });
  }

  static createManyFromNexus(nexusSaleLines: any[]): SaleLine[] {
    return nexusSaleLines.map(saleLine => this.createFromNexus(saleLine));
  }
}