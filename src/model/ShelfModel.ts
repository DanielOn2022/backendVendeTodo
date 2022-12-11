import { PrismaClient } from "@prisma/client";
import { ShelfRepository } from "../infrastructure/repositories/ShelfRepository";

export class ShelfModel {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  
  async BeginSortingProcess(managerId: number) {
    const shelfRepo = new ShelfRepository(this.prisma);
    const shelfs = await shelfRepo.getShelfsByManager(managerId);
    if (!shelfs) throw new Error('Something went wrong getting shelfs');
    return shelfs
  }
}