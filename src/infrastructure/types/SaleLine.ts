import { objectType } from 'nexus';

export const saleLine = objectType({
  name: 'SaleLine',
  definition(t) {
    t.field('cart_sale_id', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.cart_sale_id;
      }
    }); 

    t.field('saleLineId', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.saleLineId;
      }
    });
    
    t.field('product', {
      type: 'product',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.product;
      }
    });

    t.field('supplierId', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.supplierId;
      }
    });

    t.field('batchId', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.batchId;
      }
    });

    t.field('amount', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.amount;
      }
    });

    t.field('price', {
      type: 'Float',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.price;
      }
    });

    t.field('subTotal', {
      type: 'Float',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.subTotal;
      }
    });

    t.field('supplierName', {
      type: 'String',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.supplier?.snapshot.company;
      }
    });
  },
});