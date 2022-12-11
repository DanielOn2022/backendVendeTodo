import { iEntity } from "../../iEntity";
import { PaymentMethod } from "../PaymenthMethod/PaymentMethod";
import { PaymentSnapshot } from "./PaymentSnapshot";

export class Payment implements iEntity {
  private readonly id?: number | null;
  private amount: number;
  private paymentMethod: PaymentMethod;
  private concept: string;
  private reference?: string | null;

  constructor(data: {
    id?: number | null;
    amount: number;
    paymentMethod: PaymentMethod;
    concept: string;
    reference?: string | null;
  }) {
    this.id = data.id;
    this.amount = data.amount;
    this.paymentMethod = data.paymentMethod;
    this.concept = data.concept;
    this.reference = data.reference;
  }

  get snapshot(): PaymentSnapshot {
    return {
      id: this.id,
      amount: this.amount,
      paymentMethod: this.paymentMethod,
      concept: this.concept,
      reference: this.reference,
    };
  }

  setReference(reference: string): void {
    this.reference = reference;
  }
}
