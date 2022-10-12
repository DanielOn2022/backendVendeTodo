import { Product as ProductPrisma } from '@prisma/client';
import { Product } from '../domain/product/Product';


export class ProductFactory {
  static createFromPrisma(client: ProductPrisma): Product {
    return new Product({
        id: client.id,
        name: client.name,
        brand: client.brand,
        price: client.price
    });
  }
}