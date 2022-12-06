import { ApolloError } from 'apollo-server-errors';

export class AuthError extends ApolloError {
  constructor(message: string, data: {component: string, input?: Record<string, unknown>}) {
    const type = 'NOT_AUTHORIZED';
    super(message, type, { ...data });
  }
}