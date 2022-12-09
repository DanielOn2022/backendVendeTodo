import { prisma } from './database/db';
import { PrismaClient } from '@prisma/client';
import { ProductModel } from './model/ProductModel';
import { AuthModel } from './model/AuthModel';
import { ClientModel } from './model/ClientModel';

export interface Context {
  [x: string]: any;
  prisma: PrismaClient,
  productModel: ProductModel,
  authModel: AuthModel,
  clientModel: ClientModel
}

export const context = {
  prisma,
  productModel: new ProductModel(prisma),
  authModel: new AuthModel(prisma),
  clientModel: new ClientModel(prisma)
}
