import { ApolloError } from 'apollo-server-errors';

export class ClientAlreadyExistsError extends ApolloError {
  constructor(message: string, data: {component: string, input?: Record<string, unknown>}) {
    const type = 'CLIENT_ALREADY_EXIST';
    super(message, type, { ...data });
  }
}