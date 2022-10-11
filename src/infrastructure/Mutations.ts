import { intArg, mutationType, stringArg } from 'nexus';
import { createPost } from '../model/businessCases/createPost';
import logger from './Logger';

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

    t.field('deleteProduct', {
      type: 'Product',
      args: {
        id: intArg({required: true})
      },
      async resolve(_root, args, ctx) {
        const { id } = args;
        try {
          return await ctx.productModel.deleteProduct(id); 
        } catch (error: any) {
          logger.error(`An error ocurrred on deleteProduct mutation: ${error.message}`);
          return error;
        }
      }
    })
  }
});