import { PrismaClient } from "@prisma/client";
import { Product } from "../infrastructure/domain/Product/Product";
import { SaleLine } from "../infrastructure/domain/SaleLine/SaleLine";
import { ShoppingCart } from "../infrastructure/domain/ShopppingCart/ShoppingCart";
import { ShopppingCartRepository } from "../infrastructure/repositories/ShoppingCartRepository";

export class CartModel {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  
  async getCartByClientId(clientId: number) {
    const shoppingCartRepo = new ShopppingCartRepository(this.prisma);
    const cart = await shoppingCartRepo.getCartByClientId(clientId);
    if (!cart) throw new Error('Cart not found for user');
    const saleLines = await shoppingCartRepo.getSaleLinesByCart(cart as ShoppingCart);
    cart?.setSaleLines(saleLines as SaleLine[]);
    return cart;
  }

  async addToCart(data: {quantity: number, supplierId: number, product: Product, cart: ShoppingCart}) {
    const {quantity, supplierId, product, cart} = data;

    const saleLine = new SaleLine({amount: quantity, cart_sale_id: cart.snapshot.id as number, product, supplierId});
    cart.addSaleLine(saleLine);

    const shoppingCartRepo = new ShopppingCartRepository(this.prisma);
    const newSaleLines = await shoppingCartRepo.addSaleLineToCart(cart, saleLine);
    if (newSaleLines?.length) saleLine.setNewSaleLineIds(newSaleLines[0]);
    cart.updateActivity();
    shoppingCartRepo.updateCartActivity(cart);
    return cart;
  }
}