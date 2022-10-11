import { prisma } from './database/db';
import { PrismaClient } from '@prisma/client';
import { PostModel } from '../src/model/queries/post';

export interface Context {
  prisma: PrismaClient,
  postModel: PostModel
}

export const context = {
  prisma,
  postModel: new PostModel(prisma)
}