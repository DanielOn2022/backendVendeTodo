import { PrismaClient } from "@prisma/client";
import { ClientRepository } from "../infrastructure/repositories/ClientRepository";

export class ClientModel {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  
  async me(id: number) {
    const clientRepo = new ClientRepository(this.prisma);
    const client = clientRepo.getClientById(id);
    return client;
  }
}