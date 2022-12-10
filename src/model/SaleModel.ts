import { PrismaClient } from "@prisma/client";
import { SaleLine } from "../infrastructure/domain/SaleLine/SaleLine";
import { ShoppingCart } from "../infrastructure/domain/ShopppingCart/ShoppingCart";
import { ShoppingCartEmptyError } from "../infrastructure/domain/ShopppingCart/ShoppinngCartEmptyError";
import { BatchRepository } from "../infrastructure/repositories/BatchRepository";

export class SaleModel {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  
  async startPayment(cart: ShoppingCart) {
    const lines = cart.getLines();
    if (!lines) throw new ShoppingCartEmptyError("Shopping cart has no products", {
      component: "login",
      input: { cart },
    });
    const batchRepo = new BatchRepository(this.prisma);
    const availableLines = await this.verifyAvailable(lines);
    await batchRepo.compromiseProductsByLines(availableLines);
    const total = cart.getTotal(availableLines);
    const nonAvailableLines = [];
    while (lines.length > 0){
      const lastLine = lines.pop();
      const lineFound = availableLines.find(availableLine => lastLine?.snapshot.supplierId !== availableLine.snapshot.supplierId && lastLine?.snapshot.product.snapshot.id !== availableLine.snapshot.product.snapshot.id);
      if (!lineFound) nonAvailableLines.push(lastLine);
    }

    return {
      shoppingCart: cart,
      total,
      availableLines,
      nonAvailableLines
    }
  }

  async verifyAvailable(lines: SaleLine[]): Promise<SaleLine[]> {
    const batchRepo = new BatchRepository(this.prisma);
    const availableLines = [];
    for (const line of lines) {
      const availableLine = await batchRepo.getExistence(line);
      if (availableLine) availableLines.push(line);
    }
    return availableLines;
  }
  
}