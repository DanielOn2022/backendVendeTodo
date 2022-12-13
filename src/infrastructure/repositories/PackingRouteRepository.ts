import { PrismaClient, sale } from '@prisma/client';
import { Sale } from '../domain/Sale/Sale';
import { SaleFactory } from '../factories/SaleFactory';

export class PackingRouteRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async setLastIItem(saleId: number, packerId: number): Promise<boolean> {
    const databaseRoute = await this.client.packingroute.update({
      where: {packer_id_sale_id: {packer_id: packerId, sale_id: saleId}},
      data: {
        lasItem: {decrement: 1}
      }
    });
    if (!databaseRoute) return false;
    return true;
  }

  async setPacked(saleId: number, packerId: number): Promise<boolean> {
    const databaseRoute = await this.client.packingroute.update({
      where: {packer_id_sale_id: {packer_id: packerId, sale_id: saleId}},
      data: {
        packed: true
      }
    });
    if (!databaseRoute) return false;
    return true;
  }

  async getPackerSales(packerid: number): Promise<sale[] | null> {
    const salesIds = await this.client.packingroute.findMany({
      where: {packer_id: packerid}
    });
    if (!salesIds) throw new Error('The packer has no sales asigned');
    const databaseSales = [];
    for (const saleId of salesIds) {
      const databaseSale = await this.client.sale.findUnique({
        where: {id: saleId.sale_id}
      });
      if (databaseSale) databaseSales.push(databaseSale)
    }
    return databaseSales;
  }
}