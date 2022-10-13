import { Product as ProductPrisma } from '@prisma/client';
import { Product } from '../domain/post/Product';

export class ProductFactory {
    static createFromPrisma(client: ProductPrisma): Product {
      return new Product({
          id: client.id,
          name: client.name,
          price: client.price,
          brand: client.brand
      });
  }
}