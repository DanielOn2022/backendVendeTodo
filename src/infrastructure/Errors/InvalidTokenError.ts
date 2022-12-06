import { ApolloError } from 'apollo-server-errors';

export class InvalidTokenError extends ApolloError {
  constructor(message: string, data: {component: string, input?: Record<string, unknown>}) {
    const type = 'INVALID_TOKEN_ERROR';
    super(message, type, { ...data });
  }
}