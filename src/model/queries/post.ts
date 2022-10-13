import { PrismaClient } from '@prisma/client';
import { Post } from '../../infrastructure/domain/post/Post';
import { PostRepository } from '../../infrastructure/repositories/PostRepository';

export class PostModel {
  private prisma: PrismaClient;
  
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getPostById(postId: number ): Promise<Post | null> {
  
    const postRepository = new PostRepository(this.prisma);
    const post = await postRepository.getPostById(postId);

    return post;
  }

  

}