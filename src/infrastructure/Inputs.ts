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
      t.nullable.field('supplier', {
        type: 'SupplierIn',
      });
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

  inputObjectType({
    name: 'PaymentMethodIn',
    definition(t) {
      t.nonNull.int('cardNumber');
      t.nonNull.int('clientId');
    }
  }),

  inputObjectType({
    name: 'SupplierIn',
    definition(t) {
      t.nonNull.int('company');
      t.nonNull.int('id');
    }
  }),

  inputObjectType({
    name: 'ShippingAddressIn',
    definition(t) {
      t.nonNull.int('id');
      t.nonNull.string('city');
      t.nonNull.string('street');
      t.nonNull.string('externalNumber');
      t.nullable.string('internalNumber');
      t.nonNull.int('clientId');
    }
  }),
]