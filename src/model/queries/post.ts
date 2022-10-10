import { PrismaClient } from '@prisma/client';
import { Post } from '../../infrastructure/domain/post/Post';
import { PostRepository } from '../../infrastructure/repositories/PostRepository';

export const post = async (data: { prisma: PrismaClient, postId: number }): Promise<Post | null> => {
  const { prisma, postId } = data
  
  const postRepository = new PostRepository(prisma);
  const post = await postRepository.getPostById(postId);

  return post;
}