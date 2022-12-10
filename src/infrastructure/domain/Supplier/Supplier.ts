import { iEntity } from "../../iEntity";
import { SupplierSnapshot } from "./SupplierSnapshot";

export class Supplier implements iEntity {

  private readonly id?: number | null;
  private name?: string | null;
  private company: string;
  private cellphone?: string | null;
  private availableStock?: number | null; 
  private stock?: number | null;
  private compromised?: number | null;

  constructor(data: {
    id?: number | null;
    name?: string | null,
    company: string,
    cellphone?: string | null,
    availableStock?: number | null; 
    stock?: number | null;
    compromised?: number | null;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.company = data.company;
    this.cellphone = data.cellphone;
    this.availableStock = data.availableStock;
    this.stock = data.stock;
    this.compromised = data.compromised;
  }

  get snapshot(): SupplierSnapshot {
    return {
      id: this.id,
      name: this.name,
      company: this.company,
      cellphone: this.cellphone,
      availableStock: this.availableStock,
      stock: this.stock,
      compromised: this.compromised,
    };
  }

  setAvailableStock(): void {
    this.availableStock = (this.stock as number) - (this.compromised as number);
  }
}