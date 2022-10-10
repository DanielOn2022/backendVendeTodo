import { mutationType, stringArg } from 'nexus';
import { createPost } from '../model/businessCases/createPost';

export const mutations = mutationType({
  definition(t) {
    t.field('createPost', {
        type: 'post',
        args: {
          title: stringArg({required: true}),
          body: stringArg({required: true})
        },
        resolve(_root, args, ctx) {
          const { body, title } = args
          const { prisma } = ctx;

          return createPost({body, prisma, title});
        }
    });
  }
});