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
      t.field('stock', {
        type: 'Float',
        resolve(root: any, args, ctx) {
          return root.stock;
        }
      });
      t.field('volume', {
        type: 'Float',
        resolve(root: any, args, ctx) {
          return root.volume;
        }
      });
      t.field('imageUrl', {
        type: 'String',
        resolve(root: any, args, ctx) {
          return root.imageUrl;
        }
      });
      t.field('imageUrl', {
        type: 'String',
        resolve(root: any, args, ctx) {
          return root.imageUrl;
        }
      });
      t.field('description', {
        type: 'String',
        resolve(root: any, args, ctx) {
          return root.description;
        }
      });
      t.field('suppliers', {
        type: 'Supplier',
        list: true,
        nullable: true,
        resolve(root: any, args, ctx) {
          return root.suppliers;
        }
      });
  },
});