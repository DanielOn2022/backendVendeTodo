import { objectType } from 'nexus';

export const product = objectType({
  name: 'Product',
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
      t.field('brand', {
        type: 'String',
        resolve(root: any, args, ctx) {
          return root.brand;
        }
      });
      t.field('price', {
        type: 'Float',
        resolve(root: any, args, ctx) {
          return root.price;
        }
      });
  },
});