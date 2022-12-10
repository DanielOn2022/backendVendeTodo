import { supplier as PrismaSupplier, supplier } from '@prisma/client';
import { Supplier } from '../domain/Supplier/Supplier';


export class SupplierFactory {
  static createFromPrisma(supplier: {supplier: PrismaSupplier, stock: number, compromised: number}): Supplier {
    return new Supplier({
      id: supplier.supplier.id,
      company: supplier.supplier.company,
      cellphone: supplier.supplier.cellphone, 
      name: supplier.supplier.name,
      compromised: supplier.compromised,
      stock: supplier.stock,
      availableStock: supplier.stock - supplier.compromised,
    });
  }

  static createManyFromPrisma(databaseSuppliers: Array<{supplier: PrismaSupplier, stock: number, compromised: number}>): Array<Supplier> {
    return databaseSuppliers.map(supplier => this.createFromPrisma(supplier));
  }
}