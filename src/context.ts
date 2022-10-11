import { prisma } from './database/db';
import { PrismaClient } from '@prisma/client';
import { PostModel } from '../src/model/queries/post';
import { ProductModel } from './model/businessCases/ProductModel';

export interface Context {
  prisma: PrismaClient,
  postModel: PostModel,
  productModel: ProductModel
}

export const context = {
  prisma,
  postModel: new PostModel(prisma),
  productModel: new ProductModel(prisma)
}