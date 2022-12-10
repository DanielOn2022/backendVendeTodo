import moment from "moment";
import { iEntity } from "../../iEntity";
import { SaleLine } from "../SaleLine/SaleLine";
import { ShoppingCartSnapshot } from "./ShoppingCartSnapshot";
import { remove } from 'lodash';
import logger from "../../Logger";

export class ShoppingCart implements iEntity {

  private readonly id?: number | null;
  private lastUpdate: Date;
  private saleLines?: Array<SaleLine> | [];

  constructor(data: {
    id?: number | null;
    lastUpdate: Date;
    saleLines?: Array<SaleLine> | [];
  }) {
    this.id = data.id;
    this.lastUpdate = data.lastUpdate;
    this.saleLines = data.saleLines;
  }

  get snapshot(): ShoppingCartSnapshot {
    return {
      id: this.id,
      lastUpdate: this.lastUpdate,
      saleLines: this.saleLines
    };
  }

  addSaleLine(saleLine: SaleLine): void {
    if (this.saleLines) this.saleLines = [...this.saleLines, saleLine]
    else this.saleLines = [saleLine];
    this.updateActivity();
  }

  private updateActivity(): void {
    this.lastUpdate = new Date();
  }

  getLines(): SaleLine[] | [] | undefined {
    this.updateActivity();
    return this.saleLines;
  }

  getTotal(availableLines: SaleLine[]) {
    let total = 0;
    for (const line of this.saleLines as SaleLine[]) {
      if (!availableLines.find(saleLine => saleLine.snapshot.supplierId === line.snapshot.supplierId && saleLine.snapshot.product.snapshot.id === line.snapshot.product.snapshot.id))
        continue;
      const subTotal = line.getSubTotal();
      total += subTotal;
    }
    this.updateActivity();
    return total;
  }

  setSaleLines(saleLines: SaleLine[]): void {
    this.saleLines = saleLines;
    this.updateActivity();
  }

  removeLine(saleLineId: number): boolean {
    if (!this.saleLines) return false;
    try {
      remove(this.saleLines as SaleLine[], saleLine => {
        return saleLine.snapshot.saleLineId === saleLineId;
      });
    } catch (error) {
      logger.error(`Error removing saleline from cart, ${error}`);
      return false;
    }
    this.updateActivity();
    return true;
  }
}