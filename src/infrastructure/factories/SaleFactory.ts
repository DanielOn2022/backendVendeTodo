import { sale as PrismaSale } from '@prisma/client';
import { Payment } from '../domain/Payment/Payment';
import { Sale } from '../domain/Sale/Sale';
import { ShippingAddress } from '../domain/ShippingAddress/ShippingAddress';

export class SaleFactory {
  static createFromPrisma(sale: {databaseSale: PrismaSale, payment: Payment, shippingAddress: ShippingAddress}): Sale {
    return new Sale({
      id: sale.databaseSale.id,
      completed: sale.databaseSale.completed,
      date: sale.databaseSale.date,
      payment: sale.payment,
      shippingAddress: sale.shippingAddress,
      total: sale.databaseSale.total as unknown as number,
    });
  }

//   static createManyFromPrisma(databaseSuppliers: Array<{supplier: PrismaSupplier, stock: number, compromised: number}>): Array<Supplier> {
//     return databaseSuppliers.map(supplier => this.createFromPrisma(supplier));
//   }
}