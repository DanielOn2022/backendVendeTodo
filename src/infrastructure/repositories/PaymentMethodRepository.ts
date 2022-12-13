import { PrismaClient } from '@prisma/client';
import { PaymentMethod } from '../domain/PaymenthMethod/PaymentMethod';

export class PaymentMethodRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async createPaymentMethod(paymentMethod: PaymentMethod): Promise<PaymentMethod | null> {
    const databasePaymentMethod = await this.client.paymentmethod.create({
      data: {client_id: paymentMethod.snapshot.clientId, serviceCard_id: paymentMethod.snapshot.cardNumber as number}
    });
    if (!databasePaymentMethod) return null;
    return new PaymentMethod({clientId: databasePaymentMethod.client_id, cardNumber: databasePaymentMethod.serviceCard_id});
  }

  async getPaymenthMethodById(paymenthMethod: PaymentMethod): Promise<PaymentMethod | null> {
    const databasePaymentMethod = await this.client.paymentmethod.findFirst({
      where: {serviceCard_id: paymenthMethod.snapshot.cardNumber as number, client_id: paymenthMethod.snapshot.clientId}
    });
    if (!databasePaymentMethod) return null;
    return new PaymentMethod({clientId: databasePaymentMethod.client_id, cardNumber: databasePaymentMethod.serviceCard_id});
  }

  async getPaymentMethodsByClient(clientId: number): Promise<PaymentMethod[] | null> {
    const databasePaymentMethods = await this.client.paymentmethod.findMany({
      where: {client_id: clientId}
    });
    if (!databasePaymentMethods.length) return null;
    return databasePaymentMethods.map(databasePaymentMethod => new PaymentMethod({clientId: databasePaymentMethod.client_id, cardNumber: databasePaymentMethod.serviceCard_id}));
  }

  async getPaymentMethodById(paymentMethodId: number): Promise<PaymentMethod | null> {
    const databasePaymentMethods = await this.client.paymentmethod.findUnique({
      where: {serviceCard_id: paymentMethodId}
    });
    if (!databasePaymentMethods) return null;
    return  new PaymentMethod({clientId: databasePaymentMethods.client_id, cardNumber: databasePaymentMethods.serviceCard_id});
  }
}