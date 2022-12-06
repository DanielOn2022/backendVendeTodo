import { Client as ClientPrisma } from '@prisma/client';
import { Client } from '../domain/Client/Client';
import moment from 'moment';


export class ClientFactory {
  static createFromPrisma(client: ClientPrisma): Client {
    return new Client({
      id: client.id,
      name: client.name,
      cellphone: client.cellphone,
      lastLoginDate: client.lastLoginDate + '',
      profileUrl: client.profileUrl,
      email: client.email,
      password: client.password,
      createdAt: client.createdAt + '',
      token: client.token
    });
  }

  static createWithMinimalInput(data: {
    email: string,
    name: string,
    password: string,
  }): Client {
    return new Client({
      email: data.email,
      createdAt: moment().toISOString(),
      lastLoginDate: moment().toISOString(),
      name: data.name,
      password: data.password
    });
  }
}