import { PrismaClient } from "@prisma/client";
import { ProductDoesntExistsError } from "../infrastructure/domain/Product/ProductDoesNotExistError";
import { Product } from "../infrastructure/domain/Product/Product";
import { ProductRepository } from "../infrastructure/repositories/ProductRepository";

export class ProductModel {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async deleteProduct(productId: number) {
    const productRepository = new ProductRepository(this.prisma);
    const product = await productRepository.getProductById(productId);
    if (!product)
      throw new ProductDoesntExistsError("Product does not exists", {
        component: "deleteProduct",
        input: { productId },
      });

    const deleteProduct = productRepository.deleteProduct(product);
    const transactions = [deleteProduct];
    await this.prisma.$transaction(transactions);

    return product;
  }

  async createProduct(product: Product) {
    const productRepository = new ProductRepository(this.prisma);

    const createdProduct = productRepository.createProduct(product);
    if (!createdProduct)
      throw new ProductDoesntExistsError("Product could not be created", {
        component: "createProduct",
        input: { product },
      });

    return createdProduct;
  }

  async getProductById(productId: number ): Promise<Product | null> {
  
    const productRepository = new ProductRepository(this.prisma);
    const product = await productRepository.getProductById(productId);

    return product;
  }
}
