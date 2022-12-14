import { PrismaClient } from "@prisma/client";
import { Role } from "../infrastructure/domain/Employee/Employee";
import { PackingRoute } from "../infrastructure/domain/PackingRoute/PackingRoute";
import { EmployeeRepository } from "../infrastructure/repositories/EmployeeRepository";
import { PackerRepository } from "../infrastructure/repositories/PackerRepository";
import { PackingRouteRepository } from "../infrastructure/repositories/PackingRouteRepository";
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

  async beginSupply(employeeId: number) {
    const employeeRepo = new EmployeeRepository(this.prisma);
    const roleInfo = await employeeRepo.getRoleInfo(Role.packer, employeeId);
    if (!roleInfo) throw new Error('Employees role not found');
    const packerId = roleInfo?.roleId;
    const packerRepo = new PackerRepository(this.prisma);
    const packer = await packerRepo.getPackerById(packerId);
    if (!packer) throw new Error('Packer not found');
    
    const oldestSale = await this.getOldestSale(packer.packerSnapshot.packer_id as number);
    if (!oldestSale) throw new Error('Employee has no sales linked');
    
    const saleLineRepo = new SaleLineRepository(this.prisma);
    const lines = await saleLineRepo.getSaleLinesBySale(oldestSale.sale_id);
    if (!lines) throw new Error('Sale has no saleLines');

    const sectionRepo = new SectionRepository(this.prisma);
    const steps = [];
    const unStoredProducts = [];
    for (const line of lines) {
      const section = await sectionRepo.getSectionByProduct(line.snapshot.product);
      if (section) steps.push({section, saleLine: line});
      else unStoredProducts.push();
    }

    const route = new PackingRoute({packer, saleid: oldestSale.sale_id, steps });
    route.sortRoute();
    return route;
  }

  async checkProduct(saleId: number, employeeId: number) {
    const employeeRepo = new EmployeeRepository(this.prisma);
    const roleInfo = await employeeRepo.getRoleInfo(Role.packer, employeeId);
    if (!roleInfo) throw new Error('Employee is not a packer');
    const packingRouteRepo = new PackingRouteRepository(this.prisma);
    const succeded = await packingRouteRepo.setLastIItem(saleId, roleInfo?.roleId);
    return succeded;
  }

  async FinishSupply(saleLines: {saleId: number, saleLineId:number}[], employeeId: number) {
    const employeeRepo = new EmployeeRepository(this.prisma);
    const roleInfo = await employeeRepo.getRoleInfo(Role.packer, employeeId);
    if (!roleInfo) throw new Error('Employee is not a packer');
    
    const packingRouteRepo = new PackingRouteRepository(this.prisma);
    await packingRouteRepo.setPacked(saleLines[0].saleId, roleInfo?.roleId);

    const saleLineRepo = new SaleLineRepository(this.prisma);
    for (const saleLine of saleLines) {
      await saleLineRepo.updateInventory(saleLine.saleId, saleLine.saleLineId);
    }
    return true;
  }

  async getPackersales(employeeId: number) {
    const employeeRepo = new EmployeeRepository(this.prisma);
    const roleInfo = await employeeRepo.getRoleInfo(Role.packer, employeeId);
    if (!roleInfo) throw new Error('Employee is not a packer');
    
    const packingRouteRepo = new PackingRouteRepository(this.prisma);
    const sales = await packingRouteRepo.getPackerSales(roleInfo.roleId);
    return sales;
  }
}