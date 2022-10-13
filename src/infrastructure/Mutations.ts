import { GraphQLObjectType } from 'graphql';
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

  t.field('updateProduct', {
    type: 'Product',
    args: {
      id: intArg({required: true}),
      newName: stringArg({required: true}),
      newPrice: intArg({required: true}),
      newBrand: stringArg({required: true})
    },
    async resolve(_root, args, ctx) {
      const { id,newName,newPrice,newBrand } = args;
      
      try {
        return await ctx.productModel.updateProduct(id,newName,newPrice,newBrand); 
      } catch (error: any) {
        logger.error(`An error ocurrred on updateProduct mutation: ${error.message}`);
        return error;
      }
    }
  })

}
});