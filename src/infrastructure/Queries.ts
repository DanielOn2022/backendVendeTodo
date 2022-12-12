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
          logger.error(`An error ocurrred on getProductsByName query: ${error.message}`);
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
        const { product } = args;
        try {
          return await ctx.productModel.selectProduct(new Product({...product, price: product.price as unknown as Decimal, volume: product.volume as unknown as Decimal, imageUrl: product.imageUrl || ''}));
        } catch (error: any) {
          logger.error(`An error ocurrred on singleProduct query: ${error.message}`);
          return error;
        }
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
          logger.error(`An error ocurrred on getAllProducts query: ${error.message}`);
          return error;
        }
      }
    });

    t.field('logedIn', {
      type: 'User',
      nullable: true,
      authorize: (_root, _args, ctx) => {
        return isAuthenticated(ctx);
      },
      async resolve(_root, args, ctx) {
        try {
          const client = await ctx.clientModel.me(ctx.token.id);
          return client;
        } catch (error: any) {
          logger.error(`An error ocurrred on logedIn query: ${error.message}`);
          return error;
        }
      }
    });
    
    t.field('getCart', {
      type: 'ShoppingCart',
      nullable: true,
      authorize: (_root, _args, ctx) => {
        return isAuthenticated(ctx);
      },
      async resolve(_root, args, ctx) {
        try {
          const cart = await ctx.cartModel.getCartByClientId(ctx.token.id);
          return cart;
        } catch (error: any) {
          logger.error(`An error ocurrred on getCart query: ${error.message}`);
          return error;
        }
      }
    });

    t.field('getPaymentMethods', {
      type: 'PaymentMethod',
      nullable: true,
      list: true,
      authorize: (_root, _args, ctx) => {
        return isAuthenticated(ctx);
      },
      async resolve(_root, args, ctx) {
        try {
          const paymentMethods = await ctx.paymentMethodModel.getPaymentMethodsByClient(ctx.token.id);
          return paymentMethods;
        } catch (error: any) {
          logger.error(`An error ocurrred on getPaymentMethods query: ${error.message}`);
          return error;
        }
      }
    });

    t.field('getShippingAddresses', {
      type: 'ShippingAddress',
      nullable: true,
      list: true,
      authorize: (_root, _args, ctx) => {
        return isAuthenticated(ctx);
      },
      async resolve(_root, args, ctx) {
        try {
          const shippingAddresses = await ctx.shippingAddressModel.getShippingAddresses(ctx.token.id);
          return shippingAddresses;
        } catch (error: any) {
          logger.error(`An error ocurrred on getShippingAddresses query: ${error.message}`);
          return error;
        }
      }
    });

    t.field('beginSortingProcess', {
      type: 'Shelf',
      nullable: true,
      list: true,
      args: {
        role: stringArg({ required: true })
      },
      authorize: (_root, _args, ctx) => {
        return isAuthenticated(ctx);
      },
      async resolve(_root, args, ctx) {
        try {
          const { role } = args;
          const shelfs = await ctx.shelfModel.BeginSortingProcess(ctx.token.id, role);
          return shelfs;
        } catch (error: any) {
          logger.error(`An error ocurrred on beginSortingProcess query: ${error.message}`);
          return error;
        }
      }
    });

    t.field('getPackerSale', {
      type: 'Shelf',
      nullable: true,
      list: true,
      args: {
        role: stringArg({ required: true })
      },
      authorize: (_root, _args, ctx) => {
        return isAuthenticated(ctx);
      },
      async resolve(_root, args, ctx) {
        try {
          const { role } = args;
          const shelfs = await ctx.shelfModel.BeginSortingProcess(ctx.token.id, role);
          return shelfs;
        } catch (error: any) {
          logger.error(`An error ocurrred on getPackerSale query: ${error.message}`);
          return error;
        }
      }
    });
  }
});

