import { PrismaClient } from '@prisma/client';
import { ShippingAddress } from '../domain/ShippingAddress/ShippingAddress';
import { ShippingAddressFactory } from '../factories/ShippingAddressFactory';

export class ShippingAddressRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async createShippingAddress(city: string, street: string, externalNumber: string, internalNumber: string, clientId: number): Promise<ShippingAddress | null> {
    const databaseShippingAddress = await this.client.shippingaddress.create({
      data: {
        city, client_id: clientId, externalNumber, street, internalNumber
      }
    });
    if (!databaseShippingAddress) return null;
    return ShippingAddressFactory.createFromPrisma(databaseShippingAddress);
  }

  async getShippingAddressesByClient(clientId: number): Promise<ShippingAddress[] | null> {
    const databaseShippingAddresses = await this.client.shippingaddress.findMany({
      where: {client_id: clientId}
    });
    if (!databaseShippingAddresses) return null;
    return ShippingAddressFactory.createManyFromPrisma(databaseShippingAddresses);
  }
}