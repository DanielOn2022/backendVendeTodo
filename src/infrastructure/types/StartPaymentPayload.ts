import { objectType } from 'nexus';

export const startPaymentPayload = objectType({
  name: 'StartPaymentPayload',
  definition(t) {
    t.field('shoppingCart', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.shoppingCart;
      }
    }); 

    t.field('availableLines', {
      type: 'SaleLine',
      nullable: false,
      list: true,
      resolve(root: any, args, ctx) {
        return root.availableLines;
      }
    });

    t.field('nonAvailableLines', {
      type: 'SaleLine',
      nullable: false,
      list: true,
      resolve(root: any, args, ctx) {
        return root.nonAvailableLines || [];
      }
    });

    t.field('total', {
      type: 'Float',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.total;
      }
    });
  },
});