import { PrismaClient } from '@prisma/client';
import { Client } from "../domain/Client/Client";
import { ClientFactory } from '../factories/ClientFactory';

export class ClientRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async getClientByEmail(email: string): Promise<Client | null> {
    const databaseClient = await this.client.client.findUnique({
      where: {email}
    });
    if (!databaseClient) return null;
    return ClientFactory.createFromPrisma(databaseClient);
  }

  async createClient(client: Client): Promise<Client | null> {
    const databaseClient = await this.client.client.create({
      data: {
        name: client.snapshot.name,
        email: client.snapshot.email,
        password: client.snapshot.password,
        cellphone: client.snapshot.cellphone,
        createdAt: client.snapshot.createdAt,
        lastLoginDate: client.snapshot.lastLoginDate,
      }
    });
    if (!databaseClient) return null;
    return ClientFactory.createFromPrisma(databaseClient);
  }

  async setTokenToClient(client: Client): Promise<boolean> {
    if (!client.snapshot.id) throw new Error('Client id is needed for setTokenToClient');
    const databaseClient = await this.client.client.update({
      where: {id: client.snapshot.id},
      data: {
        token: client.snapshot.token || undefined
      }
    });
    if (!databaseClient) return false;
    return true;
  }

  async getClientById(clientId: number): Promise<Client | null> {
    const databaseClient = await this.client.client.findUnique({where: {id: clientId}});
    if (!databaseClient) return null;
    return ClientFactory.createFromPrisma(databaseClient);
  }
}