import { objectType } from 'nexus';

export const sortedPayload = objectType({
  name: 'SortedPayload',
  definition(t) {
    t.field('shelf', {
      type: 'Shelf',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.shelf;
      }
    }); 

    t.field('newStoredProducts', {
      type: 'product',
      nullable: false,
      list: true,
      resolve(root: any, args, ctx) {
        return root.newStoredProducts || [];
      }
    });

    t.field('newUnStoredProducts', {
      type: 'product',
      nullable: false,
      list: true,
      resolve(root: any, args, ctx) {
        return root.newUnStoredProducts || [];
      }
    });
  },
});