import { iEntity } from "../../iEntity";
import { ShippingAddressSnapshot } from "./ShippingAddressSnapshot";

export class ShippingAddress implements iEntity {

  private id? : number | null;
  private city: string;
  private street: string;
  private externalNumber: number;
  private internalNumber?: number | null;
  private clientId: number;

  constructor(data: {
    id? : number | null;
    city: string;
    street: string;
    externalNumber: number;
    internalNumber?: number | null;
    clientId: number;
  }) {
    this.id = data.id;
    this.city = data.city;
    this.street = data.street;
    this.externalNumber = data.externalNumber;
    this.internalNumber = data.internalNumber;
    this.clientId = data.clientId;
  }

  get snapshot(): ShippingAddressSnapshot {
    return {
      id: this.id,
      city: this.city,
      street: this.street,
      externalNumber: this.externalNumber,
      internalNumber: this.internalNumber,
      clientId: this.clientId,
    };
  }

}