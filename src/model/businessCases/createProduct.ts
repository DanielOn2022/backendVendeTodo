import { PrismaClient } from "@prisma/client";
import { Product } from "../../infrastructure/domain/Product/Product";
import { ProductRepository } from "../../infrastructure/repositories/ProductRepository";

export const createProduct = async (data: {
  prisma: PrismaClient;
  name: string;
  price: number;
  brand: string;
}): Promise<Product | null> => {
  const { prisma, name, price, brand } = data;

  const productRepository = new ProductRepository(prisma);

  const temProduct = new Product({ name, price, brand });
  const createProduct = productRepository.createProduct(temProduct);
  const transactions = [createProduct];
  await prisma.$transaction(transactions);

  return temProduct;
};
