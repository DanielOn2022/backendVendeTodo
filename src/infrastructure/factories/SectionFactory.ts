import {
  product as PrismaProduct,
  section as PrismaSection,
} from "@prisma/client";
import { Product } from "../domain/Product/Product";
import { Section } from "../domain/Section/Section";
import { product } from "../types";
import { ProductFactory } from "./ProductFactory";
product;

export class SectionFactory {
  static createFromPrisma(databaseSection: {
    databaseSection: PrismaSection;
    databaseProduct: PrismaProduct | null;
  }): Section {
    return new Section({
      capacity: databaseSection.databaseSection.capacity as unknown as number,
      product: ProductFactory.createFromPrisma(
        databaseSection.databaseProduct as PrismaProduct
      ),
      shelfId: databaseSection.databaseSection.shelf_id,
      sectionNumber: databaseSection.databaseSection.sectionNumber,
    });
  }
}