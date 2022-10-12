import { PrismaClient, PrismaPromise, Product as PrismaProduct} from "@prisma/client";
import { Product } from "../domain/product/Product";
import { ProductFactory } from "../factories/ProductFactory";

export class ProductRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async getProductById(productId: number): Promise<Product | null> {
    const databaseProduct = await this.client.product.findFirst({
      where: { id: productId },
    });
    if (!databaseProduct) return null;
    return ProductFactory.createFromPrisma(databaseProduct);
  }

  async createProduct(product: Product): Promise<PrismaProduct|null> {
    return await this.client.product.create({
      data: {
        name: product.snapshot.name,
        price: product.snapshot.price,
        brand: product.snapshot.brand,
      },
    });
  }

  deleteProduct(product: Product): PrismaPromise<any> {
    return this.client.product.delete({
      where: { id: product.snapshot.id?.valueOf() },
    });
  }
}
