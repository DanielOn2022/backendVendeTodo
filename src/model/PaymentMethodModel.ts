import { PrismaClient } from "@prisma/client";
import { PaymentMethod } from "../infrastructure/domain/PaymenthMethod/PaymentMethod";
import { PaymentMethodRepository } from "../infrastructure/repositories/PaymentMethodRepository";

export class PaymentMethodModel {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  
  async createPaymentMethod(cardNumber: string, clientId: number) {
    if (cardNumber.length != 16) throw new Error('Invalid Card number');
    const paymentMethodRepo = new PaymentMethodRepository(this.prisma);
    const lastFourDigits = cardNumber.substring(cardNumber.length - 4,cardNumber.length);
    const paymentMethod = new PaymentMethod({clientId, cardNumber: +lastFourDigits});
    const oldPaymentMethod = await paymentMethodRepo.getPaymenthMethodById(paymentMethod);
    if (oldPaymentMethod) throw new Error('Payment method already exists');
    const newPaymentMethod = await paymentMethodRepo.createPaymentMethod(paymentMethod);
    if (!newPaymentMethod) throw new Error('Something went wrong creating the payment method');
    return newPaymentMethod;
  }

  async getPaymentMethodsByClient(clientId: number) {
    const paymentMethodRepo = new PaymentMethodRepository(this.prisma);
    const paymentMethods = await paymentMethodRepo.getPaymentMethodsByClient(clientId);
    if (!paymentMethods) return [];
    return paymentMethods;
  }
}