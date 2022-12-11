import { PrismaClient } from '@prisma/client';
import { Shelf } from '../domain/Shelf/Shelf';
import { ShelfFactory } from '../factories/ShelfFactory';

export class ShelfRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async getShelfsByManager(managerId: number): Promise<Shelf[] | null> {
    let databaseShelfs = await this.client.shelf.findMany({
      where: {shelfM_id: managerId}, 
    });
    if (!databaseShelfs) {
      databaseShelfs = await this.client.shelf.findMany({
        where: {warehouseManager_id: managerId}
      });
    }
    const shelfs = []
    for (const databaseShelf of databaseShelfs) {
      const databaseSections = await this.client.section.findMany({
        where: {shelf_id: databaseShelf.id}
      });
      const sectionPayload = [];
      for (const databaseSection of databaseSections) {
        const databaseProduct = await this.client.product.findUnique({where: {id: databaseSection.product_id}});
        sectionPayload.push({databaseSection, databaseProduct});
      }
      shelfs.push({sectionPayload, databaseShelf});

    }
    return ShelfFactory.createManyFromPrisma(shelfs);
  }

}