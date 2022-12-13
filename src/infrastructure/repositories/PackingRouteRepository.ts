import { PrismaClient } from '@prisma/client';

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
}