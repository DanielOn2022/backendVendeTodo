import { queryType, extendType, stringArg, intArg } from 'nexus';
import logger from './Logger';
import { isAuthenticated } from './permissions';


export const queries = queryType({
  definition(t) {
    t.field('getProductsByName', {
      type: 'product',
      nullable: true,
      list: true,
      args: {
        name: stringArg({ required: true })
      },
      async resolve(_root, args, ctx) {
        try {
          const { name } = args;
          return await ctx.productModel.getProductsByName(name);
        } catch (error: any) {
          logger.error(`An error ocurrred on products query: ${error.message}`);
          return error;
        }
      }
    });

    t.field('singleProduct', {
      type: 'product',
      nullable: true,
      args: {
        id: intArg({ required: true })
      },
      async resolve(_root, args, ctx) {       
        return await ctx.productModel.getProductById(args.id);
      }
    });

    t.field('getAllProducts', {
      type: 'product',
      nullable: true,
      list: true,
      authorize: (_root, _args, ctx) => {
        return isAuthenticated(ctx);
      },
      async resolve(_root, args, ctx) {
        try {
          return await ctx.productModel.getAllProducts();
        } catch (error: any) {
          logger.error(`An error ocurrred on products query: ${error.message}`);
          return error;
        }
      }
    });
    
  }
});

