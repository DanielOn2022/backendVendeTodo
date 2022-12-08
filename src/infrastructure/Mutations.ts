import { intArg, mutationType, stringArg } from "nexus";
import logger from "./Logger";
import { Product } from "./domain/Product/Product";
import { Decimal } from "@prisma/client/runtime";

export const mutations = mutationType({
  definition(t) {
    t.field("createProduct", {
      type: 'product',
      args: {
        name: stringArg({ required: true }),
        price: intArg({ required: true }),
        brand: stringArg({ required: true }),
        stock: intArg({ required: true }),
        imageUrl: stringArg({ required: true }),
        volume: intArg({ required: true }),
        description: stringArg({ required: true }),
      },
      async resolve(_root, args, ctx) {
        const { name, price, brand, imageUrl, stock, description, volume } = args;
        return await ctx.productModel.createProduct(
          new Product({ name, brand, price: price as unknown as Decimal, imageUrl, stock, description, volume: volume as unknown as Decimal })
        );
      },
    });

    t.field("deleteProduct", {
      type: "product",
      args: { id: intArg({ required: true }) },
      async resolve(_root, args, ctx) {
        const { id } = args;
        try {
          return await ctx.productModel.deleteProduct(id);
        } catch (error: any) {
          logger.error(
            `An error ocurrred on deleteProduct mutation: ${error.message}`
          );
          return error;
        }
      },
    });

    t.field('updateProduct', {
      type: 'product',
      args: {
        id: intArg({required: true}),
        newName: stringArg({required: true}),
        newPrice: intArg({required: true}),
        newBrand: stringArg({required: true})
      },
      async resolve(_root, args, ctx) {
        const { id,newName,newPrice,newBrand } = args;
        
        try {
          return await ctx.productModel.updateProduct(id,newName,newPrice as unknown as Decimal,newBrand); 
        } catch (error: any) {
          logger.error(`An error ocurrred on updateProduct mutation: ${error.message}`);
          return error;
        }
      }
    });

    t.field('login', {
      type: 'User',
      args: {
        email: stringArg({required: true}),
        password: stringArg({required: true})
      }, 
      async resolve(_root, args, ctx) {
        const { email, password } = args;
        
        try {
          return await ctx.authModel.login(email, password); 
        } catch (error: any) {
          logger.error(`An error ocurrred on login mutation: ${error.message}`);
          return error;
        }
      }
    });

    t.field('register', {
      type: 'User',
      args: {
        email: stringArg({required: true}),
        password: stringArg({required: true}),
        cellphone: stringArg({required: false}),
        name: stringArg({required: true}),
        lastname: stringArg({required: false}),
      }, 
      async resolve(_root, args, ctx) {
        const { email, password, name, cellphone, lastname } = args;
        
        try {
          return await ctx.authModel.register({email, name, password, cellphone, lastname}); 
        } catch (error: any) {
          logger.error(`An error ocurrred on register mutation: ${error.message}`);
          return error;
        }
      }
    });
  }
});
