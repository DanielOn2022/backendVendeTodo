import { PrismaClient } from '@prisma/client';

export class PrismaRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async initTransacion() {
    this.client.$queryRaw`LOCK TABLE Batch WRITE;`;
  }

  async commitTransacion() {
    this.client.$queryRaw`UNLOCK TABLES;`;
  }

  async connect() {
    this.client.$connect();
  }

}