import { intArg, mutationType, stringArg } from "nexus";
import { ProductModel } from "../model/ProductModel";
import { createPost } from "../model/createPost";
import logger from "./Logger";
import { Product } from "./domain/Product/Product";

export const mutations = mutationType({
  definition(t) {
    t.field("createPost", {
      type: "post",
      args: {
        title: stringArg({ required: true }),
        body: stringArg({ required: true }),
      },
      resolve(_root, args, ctx) {
        const { body, title } = args;
        const { prisma } = ctx;

        return createPost({ body, prisma, title });
      },
    }),
      t.field("createProduct", {
        type: "product",
        args: {
          name: stringArg({ required: true }),
          price: intArg({ required: true }),
          brand: stringArg({ required: true }),
        },
        async resolve(_root, args, ctx) {
          const { name, price, brand } = args;

          return await ctx.productModel.createProduct(new Product({name,brand,price}));
        },
      }),
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
  },
});
