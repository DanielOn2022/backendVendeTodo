import {
  product as PrismaProduct,
  section as PrismaSection,
  shelf as PrismaShelf,
} from "@prisma/client";
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
}
