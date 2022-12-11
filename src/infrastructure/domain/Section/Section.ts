import { iEntity } from "../../iEntity";
import { Product } from "../Product/Product";
import { SectionSnapshot } from "./SectionSnapshot";

export class Section implements iEntity {
  private shelfId: number;
  private sectionNumber?: number | null;
  private capacity: number;
  private product: Product;

  constructor(data: {
    shelfId: number;
    sectionNumber?: number | null;
    capacity: number;
    product: Product;
  }) {
    this.shelfId = data.shelfId;
    this.sectionNumber = data.sectionNumber;
    this.capacity = data.capacity;
    this.product = data.product;
  }

  get snapshot(): SectionSnapshot {
    return {
      shelfId: this.shelfId,
      sectionNumber: this.sectionNumber,
      capacity: this.capacity,
      product: this.product,
    };
  }

}