import { PrismaClient } from "@prisma/client";
import { EmployeeRepository } from "../infrastructure/repositories/EmployeeRepository";
import { ShelfRepository } from "../infrastructure/repositories/ShelfRepository";

export class ShelfModel {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  
  async BeginSortingProcess(managerId: number, role: string) {
    console.log(role)
    const employeeRepo = new EmployeeRepository(this.prisma);
    const shelfRepo = new ShelfRepository(this.prisma);
    const roleInfo = await employeeRepo.getRoleInfo(role, managerId);
    if (!roleInfo) throw new Error('Somenthing went wrong getting the role info');
    const shelfs = await shelfRepo.getShelfsByManager(roleInfo.roleId);
    if (!shelfs) throw new Error('Something went wrong getting shelfs');
    return shelfs
  }
}