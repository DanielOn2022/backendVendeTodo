import { employee, packer, PrismaClient } from '@prisma/client';
import { Packer } from '../domain/Packer/Packer';
import { Sale } from '../domain/Sale/Sale';
import { PackerFactory } from '../factories/PackerFactory';

export class PackerRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async getPackerWithFewerSales(): Promise<Packer> {
    const packerWithNoSale = await this.getPackerWithNoSales();
    if (packerWithNoSale) {
      const databaseEmployee = await this.client.employee.findUnique({where: {id: packerWithNoSale.employee_id}});
      return PackerFactory.createFromPrisma({employee: databaseEmployee as employee, packer: packerWithNoSale});
    }
    const [databasePackers] = await this.client.packingroute.groupBy({
      _count: {packer_id: true},
      by: ['packer_id'],
      orderBy: {_count: {packer_id: 'asc'}},
      take: 1
    });
    const databasePacker = await this.client.packer.findUnique({where: {packer_id: databasePackers.packer_id}})
    const databaseEmployee = await this.client.employee.findUnique({where: {id: databasePacker?.employee_id as number}});
    return PackerFactory.createFromPrisma({employee: databaseEmployee as employee, packer: databasePacker as packer});
  }

  async getPackerWithNoSales(): Promise<packer | null> {
    const allPackers = await this.client.packer.findMany();
    if (!allPackers) return null;
    const allPackingRoutes = await this.client.packingroute.findMany({distinct: ['packer_id']});
    if (!allPackingRoutes) return null;
    while(allPackers.length > 0) {
      const packer = allPackers.pop();
      const packerFound = allPackingRoutes.find(packingRoute => packingRoute.packer_id === packer?.packer_id);
      if (!packerFound) return packer as packer;
    }
    return null;
  }

  async addSaleToPacker(sale: Sale, packer: Packer): Promise<boolean> {
    const databasePackingRoute = await this.client.packingroute.create({
      data: {
        lasItem: 0,
        packed: false,
        packer_id: packer.packerSnapshot.packer_id as number,
        sale_id: sale.snapshot.id as number
      }
    });
    if (!databasePackingRoute) return false;
    return true;
  }

  async getPackerById(packerId: number): Promise<Packer | null> {
    const databasePacker = await this.client.packer.findUnique({where: {packer_id: packerId}});
    if (!databasePacker) return null;
    const databaseEmployee = await this.client.employee.findUnique({where: {id: databasePacker.employee_id}});
    if (!databaseEmployee) return null;
    return PackerFactory.createFromPrisma({employee: databaseEmployee, packer: databasePacker});
  }
}