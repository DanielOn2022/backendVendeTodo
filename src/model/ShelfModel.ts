import { PrismaClient } from "@prisma/client";

export class ShelfModel {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  
  
}