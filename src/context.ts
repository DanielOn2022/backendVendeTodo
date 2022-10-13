import { prisma } from './database/db';
import { PrismaClient } from '@prisma/client';
import { PostModel } from '../src/model/queries/post';
import { ProductModel } from '../src/model/queries/readProduct';

export interface Context {
  prisma: PrismaClient,
  postModel: PostModel
  ProductModel: ProductModel
}

export const context = {
  prisma,
  postModel: new PostModel(prisma),
  ProductModel: new ProductModel(prisma)
}