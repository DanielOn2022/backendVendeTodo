import { PrismaClient } from "@prisma/client";
import { SaleLine } from "../infrastructure/domain/SaleLine/SaleLine";
import { ShoppingCart } from "../infrastructure/domain/ShopppingCart/ShoppingCart";
import { ShoppingCartEmptyError } from "../infrastructure/domain/ShopppingCart/ShoppinngCartEmptyError";
import { BatchRepository } from "../infrastructure/repositories/BatchRepository";
import { PrismaRepository } from "../infrastructure/repositories/PrismaRepository";
import { SaleRepository } from "../infrastructure/repositories/SaleRepository";
import { ShopppingCartRepository } from "../infrastructure/repositories/ShoppingCartRepository";

export class SaleModel {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  
  async startPayment(cart: ShoppingCart) {
    const lines = [...cart.getLines()];
    if (!lines.length) throw new ShoppingCartEmptyError("Shopping cart has no products", {
      component: "login",
      input: { cart },
    });
    const batchRepo = new BatchRepository(this.prisma);
    const prismaRepo = new PrismaRepository(this.prisma);
    const shoppingCartRepo = new ShopppingCartRepository(this.prisma);

    let availableLines = [];
    try {
      await prismaRepo.initTransacion();
      const locked = await shoppingCartRepo.lockCart(cart.snapshot.id as number);
      if (!locked) return {
        shoppingCart: cart,
        total: 0,
        availableLines: [],
        nonAvailableLines: cart.getLines()
      }
      await prismaRepo.lockTable('Batch');
      availableLines = await this.verifyAvailable(lines);
      await batchRepo.compromiseProductsByLines(availableLines);
      await prismaRepo.commitTransacion(); 
    } catch (error) {
      prismaRepo.rollback();
      throw new Error('Something went wrong');
    }

    const total = cart.getTotal(availableLines);
    const nonAvailableLines = [];
    while (lines.length > 0) {
      const lastLine = lines.pop();
      const lineFound = availableLines.find(availableLine => lastLine?.snapshot.supplierId === availableLine.snapshot.supplierId && lastLine?.snapshot.product.snapshot.id === availableLine.snapshot.product.snapshot.id);
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

  async cancelStartPayment(saleLines: SaleLine[]) {
    if (!saleLines.length) throw new Error('No products provided');
    const batchRepo = new BatchRepository(this.prisma);
    for (const saleLine of saleLines) {
      await batchRepo.unCompromiseSaleLine(saleLine);
    }
  }
  
}