import { objectType } from 'nexus';

export const shippingAddress = objectType({
  name: 'ShippingAddress',
  definition(t) {
    t.field('id', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.id;
      }
    }); 

    t.field('city', {
      type: 'String',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.city;
      }
    });

    t.field('street', {
      type: 'String',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.street;
      }
    });

    t.field('externalNumber', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.externalNumber;
      }
    });

    t.field('internalNumber', {
      type: 'Int',
      nullable: true,
      resolve(root: any, args, ctx) {
        return root.internalNumber;
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