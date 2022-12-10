import { objectType } from 'nexus';

export const payment = objectType({
  name: 'Payment',
  definition(t) {
    t.field('id', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.id;
      }
    }); 

    t.field('amount', {
      type: 'Float',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.amount;
      }
    });

    t.field('paymentMethod', {
      type: 'PaymentMethod',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.paymentMethod;
      }
    });

    t.field('concept', {
      type: 'String',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.concept;
      }
    });
  },
});