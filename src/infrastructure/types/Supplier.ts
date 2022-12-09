import { objectType } from 'nexus';

export const supplier = objectType({
  name: 'Supplier',
  definition(t) {
    t.field('id', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.id;
      }
    }); 

    t.field('company', {
      type: 'String',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.company;
      }
    });
  },
});