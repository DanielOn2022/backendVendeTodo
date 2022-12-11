import { iEntity } from "../../iEntity";
import { Section } from "../Section/Section";
import { ShelfSnapshot } from "./ShelfSnapshot";

export class Shelf implements iEntity {

  private id? : number | null;
  private warehouseManagerId: number;
  private shelfManagerId: number;
  private sortedDate: Date;
  private sections?: Section[] | [];

  constructor(data: {
    id? : number | null;
    warehouseManagerId: number;
    shelfManagerId: number;
    sortedDate: Date;
    sections?: Section[] | [];
  }) {
    this.id = data.id;
    this.warehouseManagerId = data.warehouseManagerId;
    this.shelfManagerId = data.shelfManagerId;
    this.sortedDate = data.sortedDate;
    this.sections = data.sections;
  }

  get snapshot(): ShelfSnapshot {
    return {
      id: this.id,
      warehouseManagerId: this.warehouseManagerId,
      shelfManagerId: this.shelfManagerId,
      sortedDate: this.sortedDate,
      sections: this.sections,
    };
  }

}