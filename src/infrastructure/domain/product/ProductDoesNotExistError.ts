import { ApolloError } from 'apollo-server-errors';

export class ProductDoesntExistsError extends ApolloError {
  constructor(message: string, data: {component: string, input?: Record<string, unknown>}) {
    const type = 'PRODUCT_DOESNT_EXIST';
    super(message, type, { ...data });
  }
}