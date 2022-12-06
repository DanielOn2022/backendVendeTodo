import { prisma } from './database/db';
import { PrismaClient } from '@prisma/client';
import { ProductModel } from './model/ProductModel';
import { AuthModel } from './model/AuthModel';

export interface Context {
  [x: string]: any;
  prisma: PrismaClient,
  productModel: ProductModel,
  authModel: AuthModel,
}

export const context = {
  prisma,
  productModel: new ProductModel(prisma),
  authModel: new AuthModel(prisma)
}
