
import { PaymentMethod } from '../domain/PaymenthMethod/PaymentMethod';


export class PaymentMethodFactory {
  static createFromNexus(nexusPaymentMethod: any): PaymentMethod {
    return new PaymentMethod({
      clientId: nexusPaymentMethod.clientId,
      cardNumber: nexusPaymentMethod.cardNumber
    });
  }
}