import { queryType, stringArg, intArg, arg } from 'nexus';


export const queries = queryType({
  definition(t) {
    t.field('products', {
      type: 'product',
      nullable: true,
      list: true,
      args: {
        test: stringArg({ required: false })
      },
      resolve(_root, args, ctx) {
        console.log(args);
        return [{name: 'pantalon', price: '300', brand: 'HW', id: '0'}];
      }
    });

    t.field('singleProduct', {
      type: 'product',
      nullable: true,
      args: {
        test: intArg({ required: true })
      },
      async resolve(_root, args, ctx) {       
        return await ctx.ProductModel.getProductById(args.test);
      }
    });

  }
});

