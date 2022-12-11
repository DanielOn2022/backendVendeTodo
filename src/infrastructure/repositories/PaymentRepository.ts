import { PrismaClient } from '@prisma/client';
import { Payment } from '../domain/Payment/Payment';
import { PaymentFactory } from '../factories/PaymentFactory';

export class PaymentRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async createPayment(payment: Payment): Promise<Payment | null> {
    const databasePayment = await this.client.payment.create({
      data: {
        amount: payment.snapshot.amount,
        paymentMethod_id: payment.snapshot.paymentMethod.snapshot.cardNumber as number,
        reference: payment.snapshot.reference || '',
        concept: payment.snapshot.concept,
      }
    });
    if (!databasePayment) return null;
    return PaymentFactory.createFromPrisma({payment: databasePayment, paymentMethod: payment.snapshot.paymentMethod});
  }

}