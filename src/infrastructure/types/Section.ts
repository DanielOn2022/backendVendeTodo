import { objectType } from 'nexus';

export const section = objectType({
  name: 'Section',
  definition(t) {
    t.field('shelfId', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.shelfId;
      }
    }); 

    t.field('sectionNumber', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.sectionNumber;
      }
    });

    t.field('capacity', {
      type: 'Float',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.capacity ;
      }
    });

    t.field('product', {
      type: 'product',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.product;
      }
    });
  },
});