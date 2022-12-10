import { PrismaClient } from '@prisma/client';
import { Product } from '../domain/Product/Product';
import { Supplier } from '../domain/Supplier/Supplier';
import { SupplierFactory } from '../factories/SupplierFactory';

export class SupplierRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async getManySuppliersByProduct(product: Product): Promise<Array<Supplier> | []> {
    if (!product.snapshot.id) throw new Error('Product id is needed for getManySuppliersByProduct');
    const databaseSuppliersXProducts = await this.client.productxsupplier.findMany({where: {product_id: product.snapshot.id, stock: {gt: 0}}, orderBy: {stock: 'desc'}});
    if (!databaseSuppliersXProducts.length) return [];
    const databaseSuppliers = await Promise.all(
      databaseSuppliersXProducts.map(async (databaseSupplierXProduct) => {
        const databaseSup = await this.client.supplier.findUnique({where: {id: databaseSupplierXProduct.supplier_id}});
        if (!databaseSup) throw new Error(`Supplier with id ${databaseSupplierXProduct.supplier_id} does not exists`);
        return {supplier: databaseSup, stock: databaseSupplierXProduct.stock, compromised: databaseSupplierXProduct.compromised};
      })
    );
    return SupplierFactory.createManyFromPrisma(databaseSuppliers);
  }
}