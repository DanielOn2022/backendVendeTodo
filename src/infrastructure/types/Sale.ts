import { objectType } from 'nexus';

export const sale = objectType({
  name: 'Sale',
  definition(t) {
    t.field('id', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.id;
      }
    }); 

    t.field('total', {
      type: 'Float',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.total;
      }
    });

    t.field('date', {
      type: 'String',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.date + '';
      }
    });

    t.field('shippingAddress', {
      type: 'ShippingAddress',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.shippingAddress;
      }
    });

    t.field('saleLines', {
      type: 'SaleLine',
      nullable: false,
      list: true,
      resolve(root: any, args, ctx) {
        return root.saleLines;
      }
    });
  },
});