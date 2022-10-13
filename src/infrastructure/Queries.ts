import { queryType, stringArg, intArg, arg } from 'nexus';
import logger from './Logger';

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
    }),
    t.field('singlePost', {
      type: 'post',
      nullable: true,
      args: {
        test: intArg({ required: true })
      },
      resolve(_root, args, ctx) {
        return ctx.postModel.getPostById(args.test);
      }
    });

   
  }
});