import { iEntity } from "../../iEntity";
import { Employee } from "../Employee/Employee";
import { PackerSnapshot } from "./PackerSnapshot";

export class Packer extends Employee implements iEntity {
  private packer_id?: number | null;
  private startingPoint: number;

  constructor(data: {
    baseData: any,
    packer_id?: number | null;
    startingPoint: number;
  }) {
    super(data.baseData);
    this.packer_id = data.packer_id;
    this.startingPoint = data.startingPoint;
  }

  get packerSnapshot(): PackerSnapshot {
    return {
        packer_id: this.packer_id,
        startingPoint: this.startingPoint,
    };
  }
}
