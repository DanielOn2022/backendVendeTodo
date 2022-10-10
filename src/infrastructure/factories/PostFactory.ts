import { Post as PostPrisma } from '@prisma/client';
import { Post } from '../domain/post/Post';


export class PostFactory {
  static createFromPrisma(client: PostPrisma): Post {
    return new Post({
        id: client.id,
        body: client.body,
        published: client.published,
        title: client.title
    });
  }
}