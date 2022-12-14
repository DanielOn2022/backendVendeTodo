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
  PaymentMethodIn: { // input type
    cardNumber: number; // Int!
    clientId: number; // Int!
  }
  Product: { // input type
    brand?: string | null; // String
    description?: string | null; // String
    id: number; // Int!
    imageUrl?: string | null; // String
    name: string; // String!
    price: number; // Float!
    stock?: number | null; // Int
    suppliers?: Array<NexusGenInputs['SupplierIn'] | null> | null; // [SupplierIn]
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
    supplier?: NexusGenInputs['SupplierIn'] | null; // SupplierIn
    supplierId: number; // Int!
  }
  SaleLinePayload: { // input type
    saleId: number; // Int!
    saleLineId: number; // Int!
  }
  ShippingAddressIn: { // input type
    city: string; // String!
    clientId: number; // Int!
    externalNumber: string; // String!
    id: number; // Int!
    internalNumber?: string | null; // String
    street: string; // String!
  }
  ShopppingCart: { // input type
    id: number; // Int!
    lastUpdate: string; // String!
    saleLines: Array<NexusGenInputs['SaleLineIn'] | null> | null; // [SaleLineIn]
  }
  SortOrder: { // input type
    productId: number; // Int!
    sectionNumber: number; // Int!
    shelfId: number; // Int!
  }
  SupplierIn: { // input type
    company: string; // String!
    id: number; // Int!
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
  BasicSale: {};
  Employee: {};
  Mutation: {};
  PackingRoute: {};
  Payment: {};
  PaymentMethod: {};
  PurchasePayload: {};
  Query: {};
  Sale: {};
  SaleLine: {};
  Section: {};
  Shelf: {};
  ShippingAddress: {};
  ShoppingCart: {};
  SortedPayload: {};
  StartPaymentPayload: {};
  Step: {};
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
  BasicSale: { // field return type
    completed: boolean; // Boolean!
    date: string; // String!
    id: number; // Int!
    total: number; // Float!
  }
  Employee: { // field return type
    cellphone: string | null; // String
    city: string | null; // String
    email: string; // String!
    externalNumber: string | null; // String
    id: number; // Int!
    internalNumber: string | null; // String
    name: string; // String!
    rfc: string; // String!
    role: string | null; // String
    street: string | null; // String
    token: string; // String!
  }
  Mutation: { // field return type
    addToCart: NexusGenRootTypes['ShoppingCart'] | null; // ShoppingCart
    authorizePayment: NexusGenRootTypes['PurchasePayload'] | null; // PurchasePayload
    begginSupply: NexusGenRootTypes['PackingRoute'] | null; // PackingRoute
    cancelStartPayment: boolean | null; // Boolean
    checkProduct: boolean | null; // Boolean
    createPaymentMethod: NexusGenRootTypes['PaymentMethod'] | null; // PaymentMethod
    createProduct: NexusGenRootTypes['product'] | null; // product
    createShippingAddress: NexusGenRootTypes['ShippingAddress'] | null; // ShippingAddress
    deleteProduct: NexusGenRootTypes['product'] | null; // product
    finishSortingProcess: boolean | null; // Boolean
    finishSupply: boolean | null; // Boolean
    login: NexusGenRootTypes['User'] | null; // User
    loginEmployee: NexusGenRootTypes['Employee'] | null; // Employee
    register: NexusGenRootTypes['User'] | null; // User
    registerEmployee: NexusGenRootTypes['Employee'] | null; // Employee
    removeLineCart: NexusGenRootTypes['ShoppingCart'] | null; // ShoppingCart
    sortShelfs: Array<NexusGenRootTypes['SortedPayload'] | null> | null; // [SortedPayload]
    startPayment: NexusGenRootTypes['StartPaymentPayload'] | null; // StartPaymentPayload
    updateProduct: NexusGenRootTypes['product'] | null; // product
  }
  PackingRoute: { // field return type
    lastItem: number; // Int!
    packed: boolean; // Boolean!
    packer: number | null; // Int
    saleid: number; // Int!
    steps: NexusGenRootTypes['Step'][]; // [Step!]!
    unStoredProducts: Array<NexusGenRootTypes['Step'] | null> | null; // [Step]
  }
  Payment: { // field return type
    amount: number; // Float!
    concept: string; // String!
    id: number; // Int!
    paymentMethod: NexusGenRootTypes['PaymentMethod']; // PaymentMethod!
  }
  PaymentMethod: { // field return type
    cardNumber: string; // String!
    clientId: number; // Int!
  }
  PurchasePayload: { // field return type
    payment: NexusGenRootTypes['Payment']; // Payment!
    sale: NexusGenRootTypes['Sale']; // Sale!
    shoppingCart: NexusGenRootTypes['ShoppingCart']; // ShoppingCart!
  }
  Query: { // field return type
    beginSortingProcess: Array<NexusGenRootTypes['Shelf'] | null> | null; // [Shelf]
    getAllProducts: Array<NexusGenRootTypes['product'] | null> | null; // [product]
    getCart: NexusGenRootTypes['ShoppingCart'] | null; // ShoppingCart
    getPackerSale: Array<NexusGenRootTypes['BasicSale'] | null> | null; // [BasicSale]
    getPaymentMethods: Array<NexusGenRootTypes['PaymentMethod'] | null> | null; // [PaymentMethod]
    getProductsByName: Array<NexusGenRootTypes['product'] | null> | null; // [product]
    getShippingAddresses: Array<NexusGenRootTypes['ShippingAddress'] | null> | null; // [ShippingAddress]
    logedIn: NexusGenRootTypes['User'] | null; // User
    singleProduct: NexusGenRootTypes['product'] | null; // product
  }
  Sale: { // field return type
    date: string; // String!
    id: number; // Int!
    saleLines: NexusGenRootTypes['SaleLine'][]; // [SaleLine!]!
    shippingAddress: NexusGenRootTypes['ShippingAddress']; // ShippingAddress!
    total: number; // Float!
  }
  SaleLine: { // field return type
    amount: number; // Int!
    batchId: number; // Int!
    cart_sale_id: number; // Int!
    price: number; // Float!
    product: NexusGenRootTypes['product']; // product!
    saleLineId: number; // Int!
    subTotal: number; // Float!
    supplier: NexusGenRootTypes['Supplier']; // Supplier!
    supplierId: number; // Int!
  }
  Section: { // field return type
    capacity: number; // Float!
    product: NexusGenRootTypes['product']; // product!
    sectionNumber: number; // Int!
    shelfId: number; // Int!
  }
  Shelf: { // field return type
    id: number; // Int!
    sections: NexusGenRootTypes['Section'][]; // [Section!]!
    shelfManagerId: number | null; // Int
    sortedDate: string; // String!
    warehouseManagerId: number; // Int!
  }
  ShippingAddress: { // field return type
    city: string; // String!
    clientId: number; // Int!
    externalNumber: string; // String!
    id: number; // Int!
    internalNumber: string | null; // String
    street: string; // String!
  }
  ShoppingCart: { // field return type
    cartLines: NexusGenRootTypes['SaleLine'][]; // [SaleLine!]!
    id: number; // Int!
    lastUpdate: string; // String!
    total: number; // Float!
  }
  SortedPayload: { // field return type
    newStoredProducts: NexusGenRootTypes['product'][]; // [product!]!
    newUnStoredProducts: NexusGenRootTypes['product'][]; // [product!]!
    shelf: NexusGenRootTypes['Shelf']; // Shelf!
  }
  StartPaymentPayload: { // field return type
    availableLines: NexusGenRootTypes['SaleLine'][]; // [SaleLine!]!
    nonAvailableLines: NexusGenRootTypes['SaleLine'][]; // [SaleLine!]!
    shoppingCart: NexusGenRootTypes['ShoppingCart']; // ShoppingCart!
    total: number; // Float!
  }
  Step: { // field return type
    saleLine: NexusGenRootTypes['SaleLine']; // SaleLine!
    section: NexusGenRootTypes['Section']; // Section!
  }
  Supplier: { // field return type
    company: string; // String!
    id: number; // Int!
    stock: number | null; // Int
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
  BasicSale: { // field return type name
    completed: 'Boolean'
    date: 'String'
    id: 'Int'
    total: 'Float'
  }
  Employee: { // field return type name
    cellphone: 'String'
    city: 'String'
    email: 'String'
    externalNumber: 'String'
    id: 'Int'
    internalNumber: 'String'
    name: 'String'
    rfc: 'String'
    role: 'String'
    street: 'String'
    token: 'String'
  }
  Mutation: { // field return type name
    addToCart: 'ShoppingCart'
    authorizePayment: 'PurchasePayload'
    begginSupply: 'PackingRoute'
    cancelStartPayment: 'Boolean'
    checkProduct: 'Boolean'
    createPaymentMethod: 'PaymentMethod'
    createProduct: 'product'
    createShippingAddress: 'ShippingAddress'
    deleteProduct: 'product'
    finishSortingProcess: 'Boolean'
    finishSupply: 'Boolean'
    login: 'User'
    loginEmployee: 'Employee'
    register: 'User'
    registerEmployee: 'Employee'
    removeLineCart: 'ShoppingCart'
    sortShelfs: 'SortedPayload'
    startPayment: 'StartPaymentPayload'
    updateProduct: 'product'
  }
  PackingRoute: { // field return type name
    lastItem: 'Int'
    packed: 'Boolean'
    packer: 'Int'
    saleid: 'Int'
    steps: 'Step'
    unStoredProducts: 'Step'
  }
  Payment: { // field return type name
    amount: 'Float'
    concept: 'String'
    id: 'Int'
    paymentMethod: 'PaymentMethod'
  }
  PaymentMethod: { // field return type name
    cardNumber: 'String'
    clientId: 'Int'
  }
  PurchasePayload: { // field return type name
    payment: 'Payment'
    sale: 'Sale'
    shoppingCart: 'ShoppingCart'
  }
  Query: { // field return type name
    beginSortingProcess: 'Shelf'
    getAllProducts: 'product'
    getCart: 'ShoppingCart'
    getPackerSale: 'BasicSale'
    getPaymentMethods: 'PaymentMethod'
    getProductsByName: 'product'
    getShippingAddresses: 'ShippingAddress'
    logedIn: 'User'
    singleProduct: 'product'
  }
  Sale: { // field return type name
    date: 'String'
    id: 'Int'
    saleLines: 'SaleLine'
    shippingAddress: 'ShippingAddress'
    total: 'Float'
  }
  SaleLine: { // field return type name
    amount: 'Int'
    batchId: 'Int'
    cart_sale_id: 'Int'
    price: 'Float'
    product: 'product'
    saleLineId: 'Int'
    subTotal: 'Float'
    supplier: 'Supplier'
    supplierId: 'Int'
  }
  Section: { // field return type name
    capacity: 'Float'
    product: 'product'
    sectionNumber: 'Int'
    shelfId: 'Int'
  }
  Shelf: { // field return type name
    id: 'Int'
    sections: 'Section'
    shelfManagerId: 'Int'
    sortedDate: 'String'
    warehouseManagerId: 'Int'
  }
  ShippingAddress: { // field return type name
    city: 'String'
    clientId: 'Int'
    externalNumber: 'String'
    id: 'Int'
    internalNumber: 'String'
    street: 'String'
  }
  ShoppingCart: { // field return type name
    cartLines: 'SaleLine'
    id: 'Int'
    lastUpdate: 'String'
    total: 'Float'
  }
  SortedPayload: { // field return type name
    newStoredProducts: 'product'
    newUnStoredProducts: 'product'
    shelf: 'Shelf'
  }
  StartPaymentPayload: { // field return type name
    availableLines: 'SaleLine'
    nonAvailableLines: 'SaleLine'
    shoppingCart: 'ShoppingCart'
    total: 'Float'
  }
  Step: { // field return type name
    saleLine: 'SaleLine'
    section: 'Section'
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
    authorizePayment: { // args
      paymentMethod: number; // Int!
      shippingAddress: number; // Int!
    }
    cancelStartPayment: { // args
      availableLines: NexusGenInputs['SaleLineIn'][]; // [SaleLineIn!]!
    }
    checkProduct: { // args
      saleId: number; // Int!
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
    createShippingAddress: { // args
      city: string; // String!
      clientId: number; // Int!
      externalNumber: string; // String!
      internalNumber?: string | null; // String
      street: string; // String!
    }
    deleteProduct: { // args
      id: number; // Int!
    }
    finishSortingProcess: { // args
      newStoredProducts?: Array<number | null> | null; // [Int]
      newUnStoredProducts?: Array<number | null> | null; // [Int]
      sortOrder: NexusGenInputs['SortOrder'][]; // [SortOrder!]!
    }
    finishSupply: { // args
      saleLinesPayload: NexusGenInputs['SaleLinePayload'][]; // [SaleLinePayload!]!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    loginEmployee: { // args
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
    registerEmployee: { // args
      email: string; // String!
      lastname?: string | null; // String
      name: string; // String!
      password: string; // String!
      rfc: string; // String!
    }
    removeLineCart: { // args
      saleLineId: number; // Int!
      shoppingCart: NexusGenInputs['ShopppingCart']; // ShopppingCart!
    }
    sortShelfs: { // args
      shelfIds: number[]; // [Int!]!
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
    beginSortingProcess: { // args
      role: string; // String!
    }
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