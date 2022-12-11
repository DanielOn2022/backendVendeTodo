import { prisma } from './database/db';
import { PrismaClient } from '@prisma/client';
import { ProductModel } from './model/ProductModel';
import { AuthModel } from './model/AuthModel';
import { ClientModel } from './model/ClientModel';
import { CartModel } from './model/CartModel';
import { SaleModel } from './model/SaleModel';
import { PaymentMethodModel } from './model/PaymentMethodModel';
import { ShippingAddressModel } from './model/ShippingAddressModel';
import { PaymentModel } from './model/PaymentModel';
import { ShelfModel } from './model/ShelfModel';

export interface Context {
  [x: string]: any;
  prisma: PrismaClient,
  productModel: ProductModel,
  authModel: AuthModel,
  clientModel: ClientModel,
  cartModel: CartModel,
  saleModel: SaleModel,
  paymentMethodModel: PaymentMethodModel,
  shippingAddressModel: ShippingAddressModel,
  paymentModel: PaymentModel,
  shelfModel: ShelfModel,
}

export const context = {
  prisma,
  productModel: new ProductModel(prisma),
  authModel: new AuthModel(prisma),
  clientModel: new ClientModel(prisma),
  cartModel: new CartModel(prisma),
  saleModel: new SaleModel(prisma),
  paymentMethodModel: new PaymentMethodModel(prisma),
  shippingAddressModel: new ShippingAddressModel(prisma),
  paymentModel: new PaymentModel(prisma),
  shelfModel: new ShelfModel(prisma),
}
