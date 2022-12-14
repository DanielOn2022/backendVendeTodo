import { PrismaClient } from '@prisma/client';
import { Product } from '../domain/Product/Product';
import { Section } from '../domain/Section/Section';
import { Shelf } from '../domain/Shelf/Shelf';
import { SectionFactory } from '../factories/SectionFactory';
import { ShelfFactory } from '../factories/ShelfFactory';

export class SectionRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async updateSectionWithProduct(sectionId: number, shelfId: number, productid:  number): Promise<Section | null> {
    const databaseSection = await this.client.section.update({
      where: {shelf_id_sectionNumber: {sectionNumber: sectionId, shelf_id: shelfId}},
      data: {
        product_id: {set: productid}
      }
    });
    if (!databaseSection) return null;
    const databaseProduct = await this.client.product.findUnique({where: {id: productid}});
    if (!databaseProduct) throw new Error('Product for section not found');
    return SectionFactory.createFromPrisma({databaseSection, databaseProduct});
  }

  async getSectionByProduct(product: Product): Promise<Section | null> {
    const databaseSection = await this.client.section.findFirst({
      where: {product_id: product.snapshot.id as number}
    });
    if (!databaseSection) return null;
    return SectionFactory.createFromPrismaByProduct(databaseSection, product);
  }

}