import { queryType, stringArg, intArg } from 'nexus';
import { post } from '../model/queries/post';

export const queries = queryType({
  definition(t) {
    t.field('posts', {
      type: 'post',
      nullable: true,
      list: true,
      args: {
        test: stringArg({ required: false })
      },
      resolve(_root, args, ctx) {
        console.log(args);
        return [{title: 'Hello', body: 'mock', published: false, id: '0'}];
      }
    });

    t.field('singlePost', {
      type: 'post',
      nullable: true,
      args: {
        test: intArg({ required: true })
      },
      resolve(_root, args, ctx) {
        const { prisma } = ctx;
        return post({postId: args.test, prisma});
      }
    });

  }
});