import { shoppingcart as PrismaShoppingCart } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Product } from '../domain/Product/Product';
import { SaleLine } from '../domain/SaleLine/SaleLine';
import { ShoppingCart } from '../domain/ShopppingCart/ShoppingCart';
import { Supplier } from '../domain/Supplier/Supplier';


export class ShopppingCartFactory {
  static createFromPrisma(shoppingCart: PrismaShoppingCart): ShoppingCart {
    return new ShoppingCart({
      id: shoppingCart.id,
      lastUpdate: shoppingCart.lastUpdate
    });
  }

  static createFromNexus(nexusCart: any): ShoppingCart {
    const saleLines = nexusCart.saleLines?.map((saleLine: any) => {
      const product = saleLine?.product;
      const saleLineProduct = new Product({
        ...product, 
        price: product?.price as unknown as Decimal, 
        name: product?.name || '', 
        volume: product?.volume as unknown as Decimal, 
        imageUrl: product?.imageUrl || ''
      });
      return new SaleLine({
        price: saleLine?.price as unknown as Decimal,
        product: saleLineProduct,
        subTotal: saleLine?.subTotal as unknown as Decimal,
        amount: saleLine?.amount || 0,
        batchId: saleLine?.batchId || 0,
        cart_sale_id: saleLine?.cart_sale_id || 0,
        saleLineId: saleLine?.saleLineId || 0,
        supplierId: saleLine?.supplierId || 0,
        ...( saleLine?.supplier ? {supplier: new Supplier({company: saleLine?.supplier.company, id: saleLine?.supplier.id})} : {} )
      });
    });
    
    return new ShoppingCart({lastUpdate: new Date(nexusCart.lastUpdate), id: nexusCart.id, saleLines});
  }
}