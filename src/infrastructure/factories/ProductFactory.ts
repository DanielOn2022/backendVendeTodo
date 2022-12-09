import { product as ProductPrisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { Product } from '../domain/product/Product';


export class ProductFactory {
  static createFromPrisma(client: ProductPrisma): Product {
    return new Product({
      id: client.id,
      name: client.name,
      description: client.description,
      brand: client.brand,
      price: client.price,
      volume: client.volume,
      imageUrl: client.imageUrl,
      stock: client.stock,
    });
  }

  static createManyFromPrisma(client: Array<ProductPrisma>): Product[] {
    return client.map(product => this.createFromPrisma(product));
  }

  static createFromNexus(nexusProduct: any): Product {
    return new Product({
      ...nexusProduct,
      imageUrl: nexusProduct.imageUrl as string,
      name: nexusProduct.name as string,
      price: nexusProduct.price as unknown as Decimal,
      volume: nexusProduct.volume as unknown as Decimal
    });
  }
}