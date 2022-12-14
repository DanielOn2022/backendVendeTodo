import { objectType } from 'nexus';

export const packingRoute = objectType({
  name: 'PackingRoute',
  definition(t) {
    t.field('lastItem', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.lastItem;
      }
    }); 

    t.field('saleid', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.saleid;
      }
    });

    t.field('packed', {
      type: 'Boolean',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.packed;
      }
    });

    t.field('steps', {
      type: 'Step',
      nullable: false,
      list: true,
      resolve(root: any, args, ctx) {
        return root.steps;
      }
    });
    
    t.field('packer', {
      type: 'Int',
      resolve(root: any, args, ctx) {
        return root.packer.startingPoint;
      }
    });

    t.field('unStoredProducts', {
      type: 'Step',
      list: true,
      resolve(root: any, args, ctx) {
        return root.packer.unStoredProducts;
      }
    });
  },
});