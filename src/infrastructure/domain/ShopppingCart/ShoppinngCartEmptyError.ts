import { ApolloError } from 'apollo-server-errors';

export class ShoppingCartEmptyError extends ApolloError {
  constructor(message: string, data: {component: string, input?: Record<string, unknown>}) {
    const type = 'SHOPPING_CART_EMPTY';
    super(message, type, { ...data });
  }
}