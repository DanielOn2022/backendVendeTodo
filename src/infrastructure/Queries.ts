import { Decimal } from '@prisma/client/runtime';
import { queryType, extendType, stringArg, intArg, arg } from 'nexus';
import { Product } from './domain/Product/Product';
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
        product: arg({ type: 'Product', required: true })
      },
      async resolve(_root, args, ctx) {       
        const {product} = args;
        return await ctx.productModel.selectProduct(new Product({...product, price: product.price as unknown as Decimal, volume: product.volume as unknown as Decimal, imageUrl: product.imageUrl || ''}));
      }
    });

    t.field('getAllProducts', {
      type: 'product',
      nullable: true,
      list: true,
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

