import { PrismaClient } from '@prisma/client';

export class PrismaRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async initTransacion() {
    this.client.$queryRaw`start transaction;`;
  }

  async lockTable(table: string) {
    this.client.$queryRaw`select * from ${table} for update;`;
  }

  async commitTransacion() {
    this.client.$queryRaw`commit;`;
  }

  async rollback() {
    this.client.$queryRaw`rollback`;
  }

}