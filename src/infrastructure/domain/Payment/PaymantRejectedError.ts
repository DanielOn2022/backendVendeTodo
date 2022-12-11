import { ApolloError } from 'apollo-server-errors';

export class PaymentRejectedError extends ApolloError {
  constructor(message: string, data: {component: string, input?: Record<string, unknown>}) {
    const type = 'PAYMENT_REJECTED';
    super(message, type, { ...data });
  }
}