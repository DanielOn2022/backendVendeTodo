import {
  product as PrismaProduct,
  section as PrismaSection,
  shelf as PrismaShelf,
} from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { Product } from "../domain/Product/Product";
import { Section } from "../domain/Section/Section";
import { Shelf } from "../domain/Shelf/Shelf";
import { SectionFactory } from "./SectionFactory";

export class ShelfFactory {
  static createFromPrisma(databaseShelf: {
    sectionPayload: {
      databaseSection: PrismaSection;
      databaseProduct: PrismaProduct | null;
    }[];
    databaseShelf: PrismaShelf;
  }): Shelf {
    return new Shelf({
      shelfManagerId: databaseShelf.databaseShelf.shelfM_id,
      sortedDate: databaseShelf.databaseShelf.sortedDate,
      warehouseManagerId: databaseShelf.databaseShelf.warehouseManager_id,
      id: databaseShelf.databaseShelf.id,
      sections: databaseShelf.sectionPayload.map((section) =>
        SectionFactory.createFromPrisma(section)
      ),
    });
  }

  static createManyFromPrisma(
    databaseShelfs: {
      sectionPayload: {
        databaseSection: PrismaSection;
        databaseProduct: PrismaProduct | null;
      }[];
      databaseShelf: PrismaShelf;
    }[]
  ): Shelf[] {
    return databaseShelfs.map((shelfPayload) =>
      this.createFromPrisma(shelfPayload)
    );
  }

  static createFromRawQuery(data: {
    id: number;
    warehouseManager_id: number;
    shelfM_id: number;
    sortedDate: string;
    shelf_id: number;
    sectionNumber: number;
    capacity: number;
    product_id: number;
    name: string;
    description: string;
    brand: string;
    price: number;
    volume: number;
    imageUrl: string;
    stock: number;
  }[]): Shelf {
    const sections = data.map(section => {
      const product = new Product({
        imageUrl: section.imageUrl,
        name: section.name,
        price: section.price as unknown as Decimal,
        brand: section.brand,
        description: section.description,
        id: section.id,
        stock: section.stock,
        volume: section.volume as unknown as Decimal,
      });
      return new Section({
        capacity: section.capacity,
        product,
        shelfId: section.shelf_id,
        sectionNumber: section.sectionNumber
      });
    });
    return new Shelf({
      shelfManagerId: data[0].shelfM_id,
      sortedDate: new Date(data[0].sortedDate),
      warehouseManagerId: data[0].warehouseManager_id,
      id: data[0].shelf_id,
      sections
    })
  }
}
