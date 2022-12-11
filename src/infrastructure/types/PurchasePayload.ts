import { objectType } from 'nexus';

export const purchasePayload = objectType({
  name: 'PurchasePayload',
  definition(t) {
    t.field('sale', {
      type: 'Sale',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.sale;
      }
    }); 

    t.field('shoppingCart', {
      type: 'ShoppingCart',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.shoppingCart;
      }
    });

    t.field('payment', {
      type: 'Payment',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.payment;
      }
    });
  },
});