import { iEntity } from "../../iEntity";
import { PaymentMethodSnapshot } from "./PaymentMethodSnapshot";

export class PaymentMethod implements iEntity {
  private readonly cardNumber?: number | null;
  private clientId: number;

  constructor(data: {
    cardNumber?: number | null;
    clientId: number;
  }) {
    this.cardNumber = data.cardNumber;
    this.clientId = data.clientId;
  }

  get snapshot(): PaymentMethodSnapshot {
    return {
      cardNumber: this.cardNumber,
      clientId: this.clientId,
    };
  }
}
