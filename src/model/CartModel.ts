import { PrismaClient } from "@prisma/client";
import { Product } from "../infrastructure/domain/Product/Product";
import { SaleLine } from "../infrastructure/domain/SaleLine/SaleLine";
import { ShoppingCart } from "../infrastructure/domain/ShopppingCart/ShoppingCart";
import { ShopppingCartRepository } from "../infrastructure/repositories/ShoppingCartRepository";

export class CartModel {
  private prisma: PrismaClient;
  private shoppingCartRepo: ShopppingCartRepository;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
    this.shoppingCartRepo = new ShopppingCartRepository(prisma);
  }
  
  async getCartByClientId(clientId: number) {
    const cart = await this.shoppingCartRepo.getCartByClientId(clientId);
    if (!cart) throw new Error('Cart not found for user');
    const saleLines = await this.shoppingCartRepo.getSaleLinesByCart(cart as ShoppingCart);
    cart?.setSaleLines(saleLines as SaleLine[]);
    return cart;
  }

  async addToCart(data: {quantity: number, supplierId: number, product: Product, cart: ShoppingCart}) {
    const {quantity, supplierId, product, cart} = data;

    const saleLine = new SaleLine({amount: quantity, cart_sale_id: cart.snapshot.id as number, product, supplierId});
    cart.addSaleLine(saleLine);

    const newSaleLines = await this.shoppingCartRepo.addSaleLineToCart(cart, saleLine);
    if (newSaleLines?.length) saleLine.setNewSaleLineIds(newSaleLines[0]);
    this.shoppingCartRepo.updateCartActivity(cart);
    return cart;
  }

  async removeLineFromCart(cart: ShoppingCart, saleLineId: number) {
    const succeeded = cart.removeLine(saleLineId);
    if (!succeeded) throw new Error('Something went wrong removing sale line from cart');
    const saleLineRemoved = await this.shoppingCartRepo.removeSaleLineFromCart(cart, saleLineId);
    if (!saleLineRemoved) throw new Error('Something went wrong removing sale line from cart');
    return cart;
  }
}