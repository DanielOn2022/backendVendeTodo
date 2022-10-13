import { PrismaClient } from '@prisma/client';
import { ProductRepository } from '../../infrastructure/repositories/ProductRepository';

import { Product } from '../../infrastructure/domain/post/Product';

export class ProductModel {
  private prisma: PrismaClient;
  
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getProductById(productId: number ): Promise<Product | null> {
  
    const productRepository = new ProductRepository(this.prisma);
    const product = await productRepository.getProductById(productId);

    return product;
  }

}