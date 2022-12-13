import { objectType } from 'nexus';

export const basicSale = objectType({
  name: 'BasicSale',
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

    t.field('completed', {
      type: 'Boolean',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.completed;
      }
    });
  },
});