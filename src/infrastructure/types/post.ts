import { objectType } from 'nexus';

export const post = objectType({
  name: 'post',
  definition(t) {
    t.field('id', {
      type: 'Int',
      resolve(root: any, args, ctx) {
        return root.id;
      }
    });
    t.field('title', {
      type: 'String',
      resolve(root: any, args, ctx) {
        return root.title;
      }
    });
    t.field('body', {
      type: 'String',
      resolve(root: any, args, ctx) {
        return root.body;
      }
    });
    t.field('published', {
      type: 'Boolean',
      resolve(root: any, args, ctx) {
        return root.published;
      }
    });
  }
});