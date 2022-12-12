import { PrismaClient } from "@prisma/client";
import { PackingRoute } from "../infrastructure/domain/PackingRoute/PackingRoute";
import { BatchRepository } from "../infrastructure/repositories/BatchRepository";
import { ClientRepository } from "../infrastructure/repositories/ClientRepository";
import { PackerRepository } from "../infrastructure/repositories/PackerRepository";
import { SaleLineRepository } from "../infrastructure/repositories/SaleLineRepository";
import { SaleRepository } from "../infrastructure/repositories/SaleRepository";
import { SectionRepository } from "../infrastructure/repositories/SectionRepository";

export class PackingRouteModel {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  
  async getOldestSale(packerId: number) {
    const saleRepo = new SaleRepository(this.prisma);
    const packingRoutes = await saleRepo.getPackingRoutes(packerId);
    if (packingRoutes) return packingRoutes[0];
    return null;
  }

  async beginSupply(packerId: number) {
    const packerRepo = new PackerRepository(this.prisma);
    const packer = await packerRepo.getPackerById(packerId);
    if (!packer) throw new Error('Packer not found');
    
    const oldestSale = await this.getOldestSale(packerId);
    if (!oldestSale) throw new Error('Employee has no sales linked');
    
    const saleLineRepo = new SaleLineRepository(this.prisma);
    const lines = await saleLineRepo.getSaleLinesBySale(oldestSale.sale_id);
    if (!lines) throw new Error('Sale has no saleLines');

    const sectionRepo = new SectionRepository(this.prisma);
    const batchRepo = new BatchRepository(this.prisma);
    const steps = [];
    for (const line of lines) {
      const section = await sectionRepo.getSectionByProduct(line.snapshot.product);
      if (section) steps.push({section, saleLine: line});
    }

    const route = new PackingRoute({packer, saleid: oldestSale.sale_id, steps });

  }
}