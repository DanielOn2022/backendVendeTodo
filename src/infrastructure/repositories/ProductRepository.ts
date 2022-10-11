import { PrismaClient, PrismaPromise } from '@prisma/client';
import { Product } from '../domain/Product/Product';
import { ProductFactory } from '../factories/ProductFactory';

export class ProductRepository {
  private client: PrismaClient  

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async getProductById(productId: number): Promise<Product | null> {
    const databaseProduct = await this.client.product.findFirst({where: {id: productId}});
    if (!databaseProduct) return null;
    return ProductFactory.createFromPrisma(databaseProduct);
  }

  createProduct(product: Product): PrismaPromise<any> {
    return this.client.product.create({
      data: {
        name: product.snapshot.name,
        price: product.snapshot.price,
        brand: product.snapshot.brand
      }
    });
  }

}