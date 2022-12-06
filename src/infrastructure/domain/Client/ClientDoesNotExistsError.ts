import { ApolloError } from 'apollo-server-errors';

export class ClientDoesntExistsError extends ApolloError {
  constructor(message: string, data: {component: string, input?: Record<string, unknown>}) {
    const type = 'CLIENT_DOESNT_EXIST';
    super(message, type, { ...data });
  }
}