import { PrismaClient, PrismaPromise } from '@prisma/client';
import { Post } from '../domain/post/Post';
import { PostFactory } from '../factories/PostFactory';

export class PostRepository {
  private client: PrismaClient  

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async getPostById(postId: number): Promise<Post | null> {
    const databasePost = await this.client.post.findFirst({where: {id: postId}});
    if (!databasePost) return null;
    return PostFactory.createFromPrisma(databasePost);
  }

  createPost(post: Post): PrismaPromise<any> {
    return this.client.post.create({
      data: {
        body: post.snapshot.body,
        published: post.snapshot.published,
        title: post.snapshot.title
      }
    });
  }

}