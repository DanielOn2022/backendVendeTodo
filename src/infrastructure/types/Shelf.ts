import { objectType } from 'nexus';

export const shelf = objectType({
  name: 'Shelf',
  definition(t) {
    t.field('id', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.id;
      }
    }); 

    t.field('warehouseManagerId', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.warehouseManagerId;
      }
    });

    t.field('shelfManagerId', {
      type: 'Int',
      nullable: true,
      resolve(root: any, args, ctx) {
        return root.shelfManagerId ;
      }
    });

    t.field('sortedDate', {
      type: 'String',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.sortedDate + '';
      }
    });

    t.field('sections', {
      type: 'Section',
      nullable: false,
      list: true,
      resolve(root: any, args, ctx) {
        return root.sections || [];
      }
    });
  },
});