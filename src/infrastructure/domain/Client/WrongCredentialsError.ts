import { ApolloError } from 'apollo-server-errors';

export class WrongCredentialsError extends ApolloError {
  constructor(message: string, data: {component: string, input?: Record<string, unknown>}) {
    const type = 'WRONG_CREDENTIALS';
    super(message, type, { ...data });
  }
}