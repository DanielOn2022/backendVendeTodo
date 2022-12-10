import { inputObjectType } from 'nexus';

export const inputs = [
  inputObjectType({
    name: 'Product',
    definition(t) {
      t.nonNull.int('id');
      t.nullable.int('stock');
      t.nonNull.float('price');
      t.nullable.float('volume');
      t.nullable.string('description');
      t.nullable.string('brand');
      t.nullable.string('imageUrl');
      t.nonNull.string('name');
    }
  }),

  inputObjectType({
    name: 'SaleLineIn',
    definition(t) {
      t.nonNull.int('cart_sale_id');
      t.nonNull.int('saleLineId');
      t.nonNull.field('product', { type: 'Product' });
      t.nonNull.int('supplierId');
      t.nonNull.int('batchId');
      t.nonNull.int('amount');
      t.nonNull.float('price');
      t.nonNull.float('subTotal');
    }
  }),

  inputObjectType({
    name: 'ShopppingCart',
    definition(t) {
      t.nonNull.int('id');
      t.nonNull.string('lastUpdate');
      t.nullable.field('saleLines', {
        type: 'SaleLineIn',
        list: true,
        default: []
      });
    }
  }),
]