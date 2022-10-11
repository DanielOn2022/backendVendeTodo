import { intArg, mutationType, stringArg } from "nexus";
import { createPost } from "../model/businessCases/createPost";
import { createProduct } from "../model/businessCases/createProduct";

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
        resolve(_root, args, ctx) {
          const { name, price, brand } = args;
          const { prisma } = ctx;

          return createProduct({ name, price, brand, prisma});
        },
      });
  },
});
