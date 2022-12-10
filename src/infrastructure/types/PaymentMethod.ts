import { objectType } from 'nexus';

export const paymentMethod = objectType({
  name: 'PaymentMethod',
  definition(t) {
    t.field('cardNumber', {
      type: 'String',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.cardNumber;
      }
    }); 

    t.field('clientId', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.clientId;
      }
    });
  },
});