import { objectType } from "nexus";

export const employee = objectType({
  name: "Employee",
  definition(t) {
    t.field("id", {
      type: "Int",
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.id;
      },
    });

    t.field("name", {
      type: "String",
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.name;
      },
    });

    t.field("cellphone", {
      type: "String",
      nullable: true,
      resolve(root: any, args, ctx) {
        return root.cellphone;
      },
    });

    t.field("rfc", {
      type: "String",
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.rfc;
      },
    });

    t.field("email", {
      type: "String",
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.email;
      },
    });

    t.field("token", {
      type: "String",
      nullable: false,
      resolve(root: any, args, ctx) {
        return root.token;
      },
    });

    t.field("city", {
      type: "String",
      nullable: true,
      resolve(root: any, args, ctx) {
        return root.city;
      },
    });

    t.field("street", {
      type: "String",
      nullable: true,
      resolve(root: any, args, ctx) {
        return root.street;
      },
    });

    t.field("externalNumber", {
      type: "String",
      nullable: true,
      resolve(root: any, args, ctx) {
        return root.externalNumber;
      },
    });

    t.field("internalNumber", {
      type: "String",
      nullable: true,
      resolve(root: any, args, ctx) {
        return root.internalNumber;
      },
    });

    t.field("role", {
      type: "String",
      nullable: true,
      resolve(root: any, args, ctx) {
        return root.role + '';
      },
    });
  },
});
