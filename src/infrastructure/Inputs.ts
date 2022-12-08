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
]