import { PrismaClient, PrismaPromise } from '@prisma/client';
import { Product } from '../domain/product/Product';
import { ProductFactory } from '../factories/ProductFactory';

export class ProductRepository {
  private client: PrismaClient  

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async getProductById(productId: number): Promise<Product | null> {
    const databaseProduct = await this.client.product.findFirst({ where: {id: productId} });
    if (!databaseProduct) return null;
    return ProductFactory.createFromPrisma(databaseProduct);
  }

  async updateProduct(product: Product): Promise<Product>{

    //console.log(newName,newPrice,newBrand);
    const { name,price,brand } = product.snapshot
    const databaseProduct= await this.client.product.update({where: {
        id: product.snapshot.id?.valueOf(),
    },
    data: {
        name,
        price,
        brand
    }
    });
    return new Product(databaseProduct); 
  }
}