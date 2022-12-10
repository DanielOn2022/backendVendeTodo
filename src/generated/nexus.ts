/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"
import type { FieldAuthorizeResolver } from "nexus/dist/plugins/fieldAuthorizePlugin"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  Product: { // input type
    brand?: string | null; // String
    description?: string | null; // String
    id: number; // Int!
    imageUrl?: string | null; // String
    name: string; // String!
    price: number; // Float!
    stock?: number | null; // Int
    volume?: number | null; // Float
  }
  SaleLineIn: { // input type
    amount: number; // Int!
    batchId: number; // Int!
    cart_sale_id: number; // Int!
    price: number; // Float!
    product: NexusGenInputs['Product']; // Product!
    saleLineId: number; // Int!
    subTotal: number; // Float!
    supplierId: number; // Int!
  }
  ShopppingCart: { // input type
    id: number; // Int!
    lastUpdate: string; // String!
    saleLines: Array<NexusGenInputs['SaleLineIn'] | null> | null; // [SaleLineIn]
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Mutation: {};
  PaymentMethod: {};
  Query: {};
  SaleLine: {};
  ShoppingCart: {};
  StartPaymentPayload: {};
  Supplier: {};
  User: {};
  product: {};
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    addToCart: NexusGenRootTypes['ShoppingCart'] | null; // ShoppingCart
    cancelStartPayment: boolean | null; // Boolean
    createPaymentMethod: NexusGenRootTypes['PaymentMethod'] | null; // PaymentMethod
    createProduct: NexusGenRootTypes['product'] | null; // product
    deleteProduct: NexusGenRootTypes['product'] | null; // product
    login: NexusGenRootTypes['User'] | null; // User
    register: NexusGenRootTypes['User'] | null; // User
    startPayment: NexusGenRootTypes['StartPaymentPayload'] | null; // StartPaymentPayload
    updateProduct: NexusGenRootTypes['product'] | null; // product
  }
  PaymentMethod: { // field return type
    cardNumber: string; // String!
    clientId: number; // Int!
  }
  Query: { // field return type
    getAllProducts: Array<NexusGenRootTypes['product'] | null> | null; // [product]
    getCart: NexusGenRootTypes['ShoppingCart'] | null; // ShoppingCart
    getPaymentMethods: Array<NexusGenRootTypes['PaymentMethod'] | null> | null; // [PaymentMethod]
    getProductsByName: Array<NexusGenRootTypes['product'] | null> | null; // [product]
    logedIn: NexusGenRootTypes['User'] | null; // User
    singleProduct: NexusGenRootTypes['product'] | null; // product
  }
  SaleLine: { // field return type
    amount: number; // Int!
    batchId: number; // Int!
    cart_sale_id: number; // Int!
    price: number; // Float!
    product: NexusGenRootTypes['product']; // product!
    saleLineId: number; // Int!
    subTotal: number; // Float!
    supplierId: number; // Int!
  }
  ShoppingCart: { // field return type
    cartLines: NexusGenRootTypes['SaleLine'][]; // [SaleLine!]!
    id: number; // Int!
    lastUpdate: string; // String!
    total: number; // Float!
  }
  StartPaymentPayload: { // field return type
    availableLines: NexusGenRootTypes['SaleLine'][]; // [SaleLine!]!
    nonAvailableLines: NexusGenRootTypes['SaleLine'][]; // [SaleLine!]!
    shoppingCart: number; // Int!
    total: number; // Float!
  }
  Supplier: { // field return type
    company: string; // String!
    id: number; // Int!
    stock: number; // Int!
  }
  User: { // field return type
    email: string; // String!
    id: number; // Int!
    lastLoginDate: string; // String!
    name: string; // String!
    profileUrl: string | null; // String
    shoppingCart: NexusGenRootTypes['ShoppingCart'] | null; // ShoppingCart
    token: string; // String!
  }
  product: { // field return type
    brand: string | null; // String
    description: string | null; // String
    id: number | null; // Int
    imageUrl: string | null; // String
    name: string | null; // String
    price: number | null; // Float
    stock: number | null; // Float
    suppliers: Array<NexusGenRootTypes['Supplier'] | null> | null; // [Supplier]
    volume: number | null; // Float
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    addToCart: 'ShoppingCart'
    cancelStartPayment: 'Boolean'
    createPaymentMethod: 'PaymentMethod'
    createProduct: 'product'
    deleteProduct: 'product'
    login: 'User'
    register: 'User'
    startPayment: 'StartPaymentPayload'
    updateProduct: 'product'
  }
  PaymentMethod: { // field return type name
    cardNumber: 'String'
    clientId: 'Int'
  }
  Query: { // field return type name
    getAllProducts: 'product'
    getCart: 'ShoppingCart'
    getPaymentMethods: 'PaymentMethod'
    getProductsByName: 'product'
    logedIn: 'User'
    singleProduct: 'product'
  }
  SaleLine: { // field return type name
    amount: 'Int'
    batchId: 'Int'
    cart_sale_id: 'Int'
    price: 'Float'
    product: 'product'
    saleLineId: 'Int'
    subTotal: 'Float'
    supplierId: 'Int'
  }
  ShoppingCart: { // field return type name
    cartLines: 'SaleLine'
    id: 'Int'
    lastUpdate: 'String'
    total: 'Float'
  }
  StartPaymentPayload: { // field return type name
    availableLines: 'SaleLine'
    nonAvailableLines: 'SaleLine'
    shoppingCart: 'Int'
    total: 'Float'
  }
  Supplier: { // field return type name
    company: 'String'
    id: 'Int'
    stock: 'Int'
  }
  User: { // field return type name
    email: 'String'
    id: 'Int'
    lastLoginDate: 'String'
    name: 'String'
    profileUrl: 'String'
    shoppingCart: 'ShoppingCart'
    token: 'String'
  }
  product: { // field return type name
    brand: 'String'
    description: 'String'
    id: 'Int'
    imageUrl: 'String'
    name: 'String'
    price: 'Float'
    stock: 'Float'
    suppliers: 'Supplier'
    volume: 'Float'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addToCart: { // args
      cart: NexusGenInputs['ShopppingCart']; // ShopppingCart!
      product: NexusGenInputs['Product']; // Product!
      quantity: number; // Int!
      supplierId: number; // Int!
    }
    cancelStartPayment: { // args
      availableLines: NexusGenInputs['SaleLineIn'][]; // [SaleLineIn!]!
    }
    createPaymentMethod: { // args
      cardNumber: string; // String!
      clientId: number; // Int!
    }
    createProduct: { // args
      brand: string; // String!
      description: string; // String!
      imageUrl: string; // String!
      name: string; // String!
      price: number; // Int!
      stock: number; // Int!
      volume: number; // Int!
    }
    deleteProduct: { // args
      id: number; // Int!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    register: { // args
      cellphone?: string | null; // String
      email: string; // String!
      lastname?: string | null; // String
      name: string; // String!
      password: string; // String!
    }
    startPayment: { // args
      cart: NexusGenInputs['ShopppingCart']; // ShopppingCart!
    }
    updateProduct: { // args
      id: number; // Int!
      newBrand: string; // String!
      newName: string; // String!
      newPrice: number; // Int!
    }
  }
  Query: {
    getProductsByName: { // args
      name: string; // String!
    }
    singleProduct: { // args
      product: NexusGenInputs['Product']; // Product!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
}