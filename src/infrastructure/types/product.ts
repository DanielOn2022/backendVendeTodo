import { objectType } from 'nexus';

export const product = objectType({
  name: 'product',
  definition(t) {
    t.field('id', {
      type: 'Int',
      resolve(root: any, args, ctx) {
        return root.id;
      }
    });
    t.field('name', {
      type: 'String',
      resolve(root: any, args, ctx) {
        return root.name;
      }
    });
    t.field('price', {
      type: 'Int',
      resolve(root: any, args, ctx) {
        return root.price;
      }
    });
    t.field('brand', {
      type: 'String',
      resolve(root: any, args, ctx) {
        return root.brand;
      }
    });
  }
});