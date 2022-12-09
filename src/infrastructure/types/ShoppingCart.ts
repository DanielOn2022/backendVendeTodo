import { objectType } from 'nexus';

export const shoppingCart = objectType({
  name: 'ShoppingCart',
  definition(t) {
    t.field('id', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.id;
      }
    }); 

    t.field('lastUpdate', {
      type: 'String',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.lastUpdate;
      }
    });

    t.field('saleLines', {
      type: 'SaleLine',
      nullable: false,
      list: true,
      resolve(root: any, args, ctx) {
        return root.saleLines || [];
      }
    });
  },
});