import { prisma } from './database/db';
import { PrismaClient } from '@prisma/client';
import { ProductModel } from './model/ProductModel';

export interface Context {
  [x: string]: any;
  prisma: PrismaClient,
  productModel: ProductModel
}

export const context = {
  prisma,
  productModel: new ProductModel(prisma)
}
