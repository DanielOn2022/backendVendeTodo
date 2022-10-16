import { Product as ProductPrisma } from '@prisma/client';
import { Product } from '../domain/product/Product';


export class ProductFactory {
  static createFromPrisma(client: ProductPrisma): Product {
    return new Product({
        id: client.id,
        name: client.name,
        price: client.price,
        brand: client.brand
    });
  }

  static createManyFromPrisma(client: ProductPrisma[]): Product[] {
    return client.map(product => this.createFromPrisma(product));
  }
}