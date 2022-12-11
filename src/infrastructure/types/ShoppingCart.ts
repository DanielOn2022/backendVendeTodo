import { objectType } from 'nexus';

export const shoppingCart = objectType({
  name: 'ShoppingCart',
  definition(t) {
    t.field('id', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.id as number;
      }
    }); 

    t.field('lastUpdate', {
      type: 'String',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.lastUpdate;
      }
    });

    t.field('cartLines', {
      type: 'SaleLine',
      nullable: false,
      list: true,
      resolve(root: any, args, ctx) {
        return root.saleLines || [];
      }
    });

    t.field('total', {
      type: 'Float',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.getTotal(root.getLines()) || 0;
      }
    });
  },
});