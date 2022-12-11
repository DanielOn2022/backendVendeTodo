import { iEntity } from "../../iEntity";
import { Payment } from "../Payment/Payment";
import { ShippingAddress } from "../ShippingAddress/ShippingAddress";
import { SaleSnapshot } from "./SaleSnapshot";

export class Sale implements iEntity {
  private readonly id?: number | null;
  private total: number;
  private date: Date;
  private payment: Payment;
  private shippingAddress: ShippingAddress;
  private completed: boolean;

  constructor(data: {
    id?: number | null;
    total: number;
    date: Date;
    payment: Payment;
    shippingAddress: ShippingAddress;
    completed: boolean;
  }) {
    this.id = data.id;
    this.total = data.total;
    this.date = data.date;
    this.payment = data.payment;
    this.shippingAddress = data.shippingAddress;
    this.completed = data.completed;
  }

  get snapshot(): SaleSnapshot {
    return {
      id: this.id,
      total: this.total,
      date: this.date,
      payment: this.payment,
      shippingAddress: this.shippingAddress,
      completed: this.completed,
    };
  }
}
