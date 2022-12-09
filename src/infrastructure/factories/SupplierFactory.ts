import { supplier as PrismaSupplier, supplier } from '@prisma/client';
import { Supplier } from '../domain/Supplier/Supplier';


export class SupplierFactory {
  static createFromPrisma(supplier: PrismaSupplier): Supplier {
    return new Supplier({
      id: supplier.id,
      company: supplier.company,
      cellphone: supplier.cellphone, 
      name: supplier.name
    });
  }

  static createManyFromPrisma(databaseSuppliers: Array<supplier>): Array<Supplier> {
    return databaseSuppliers.map(supplier => this.createFromPrisma(supplier));
  }
}