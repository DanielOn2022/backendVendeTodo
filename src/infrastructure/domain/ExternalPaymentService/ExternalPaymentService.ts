import moment from "moment";
import { Payment } from "../Payment/Payment";

export class ExternalPaymentService {

  static authorizePayment(payment: Payment): boolean {
    if (payment.snapshot.amount > 9999) return false;
    if (payment.snapshot.paymentMethod.snapshot.cardNumber as number % 2 != 0) return false;
    payment.setReference(`payment-reference-external-service-${moment().toISOString()}`);
    return true;
  }
  
}
