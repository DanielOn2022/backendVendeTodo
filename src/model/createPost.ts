import { PrismaClient } from '@prisma/client';
import { Post } from '../infrastructure/domain/post/Post';
import { PostRepository } from '../infrastructure/repositories/PostRepository';

export const createPost = async (data: {
  prisma: PrismaClient,
  title: string,
  body: string
}): Promise<Post | null> => {
  const { prisma, title, body } = data
  
  const postRepository = new PostRepository(prisma);

  const temPost = new Post({body, title, published: false});
  const createPost = postRepository.createPost(temPost);
  const transactions = [createPost];
  await prisma.$transaction(transactions);

  return temPost;
}