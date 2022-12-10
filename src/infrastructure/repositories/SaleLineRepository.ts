import { PrismaClient } from '@prisma/client';

export class SaleLineRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }


}