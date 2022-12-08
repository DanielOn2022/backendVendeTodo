import { product as ProductPrisma } from '@prisma/client';
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
}