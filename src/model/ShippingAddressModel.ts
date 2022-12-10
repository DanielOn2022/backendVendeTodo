import { PrismaClient } from "@prisma/client";
import { ShippingAddressRepository } from "../infrastructure/repositories/ShippingAddressRepository";

export class ShippingAddressModel {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  
  async createShippingAddress(city: string, street: string, externalNumber: string, internalNumber: string, clientId: number) {
    const shippingAddressRepo = new ShippingAddressRepository(this.prisma);
    const shippingAddress = await shippingAddressRepo.createShippingAddress(city, street, externalNumber, internalNumber, clientId);
    if (!shippingAddress) throw new Error('Something went wrong creating the shippingAddress');
    return shippingAddress;
  }
  
  async getShippingAddresses(clientId: number) {
    const shippingAddressRepo = new ShippingAddressRepository(this.prisma);
    const shippingAddresses = await shippingAddressRepo.getShippingAddressesByClient(clientId);
    if (!shippingAddresses) return [];
    return shippingAddresses;
  }
}