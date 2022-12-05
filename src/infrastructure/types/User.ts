import { objectType } from 'nexus';

export const user = objectType({
  name: 'User',
  definition(t) {
    t.field('id', {
      type: 'Int',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.id;
      }
    });

    t.field('name', {
      type: 'String',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.name;
      }
    });

    t.field('lastLoginDate', {
      type: 'String',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.lastLoginDate;
      }
    });

    t.field('profileUrl', {
      type: 'String',
      nullable: true,
      resolve(root: any, args, ctx) {
        return root.profileUrl;
      }
    });

    t.field('email', {
      type: 'String',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.email;
      }
    });

    t.field('token', {
      type: 'String',
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.token;
      }
    });
  },
});