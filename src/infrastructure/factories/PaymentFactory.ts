import { payment as PaymentPrisma } from '@prisma/client';
import { Payment } from '../domain/Payment/Payment';
import { PaymentMethod } from '../domain/PaymenthMethod/PaymentMethod';


export class PaymentFactory {
  static createFromPrisma(data: {payment: PaymentPrisma, paymentMethod: PaymentMethod}): Payment {
    return new Payment({
      amount: data.payment.amount as unknown as number,
      concept: data.payment.concept || '',
      paymentMethod: data.paymentMethod,
      id: data.payment.id,
      reference: data.payment.reference,
    });
  }

  static createWithMinimalInput(data: {
    amount: number;
    paymentMethod: PaymentMethod;
    concept: string;
  }): Payment {
    return new Payment({
      amount: data.amount,
      concept: data.concept,
      paymentMethod: data.paymentMethod
    });
  }
}