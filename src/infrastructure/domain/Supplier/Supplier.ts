import { iEntity } from "../../iEntity";
import { SupplierSnapshot } from "./SupplierSnapshot";

export class Supplier implements iEntity {

  private readonly id?: number | null;
  private name?: string | null;
  private company: string;
  private cellphone?: string | null;

  constructor(data: {
    id?: number | null;
    name?: string | null,
    company: string,
    cellphone?: string | null
  }) {
    this.id = data.id;
    this.name = data.name;
    this.company = data.company;
    this.cellphone = data.cellphone;
  }

  get snapshot(): SupplierSnapshot {
    return {
      id: this.id,
      name: this.name,
      company: this.company,
      cellphone: this.cellphone
    };
  }

}