import { objectType } from 'nexus';

export const step = objectType({
  name: 'Step',
  definition(t) {
    t.field('section', {
      type: 'Section',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.section;
      }
    }); 

    t.field('saleLine', {
      type: 'SaleLine',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.saleLine;
      }
    });
  },
});