import { PrismaClient } from "@prisma/client";
import { SaleLine } from "../domain/SaleLine/SaleLine";

export class BatchRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async getExistence(line: SaleLine): Promise<any | null> {
    const productXSupplier = await this.client.productxsupplier.findUnique({
      where: {
        product_id_supplier_id: {
          product_id: line.snapshot.product.snapshot.id as number,
          supplier_id: line.snapshot.supplierId,
        },
      },
    });
    if ( line.snapshot.amount <= (productXSupplier?.stock as number) - (productXSupplier?.compromised as number) )
      return productXSupplier;
    return null;
  }

  async compromiseProductsByLines(saleLines: SaleLine[]) {
    const compromisedSaleLines = await Promise.all(
      saleLines.map(async (availableLine) => {
        const databaseBatches = await this.client.batch.findMany({
          where: {
            product_id: availableLine?.snapshot.product.snapshot.id as number,
            supplier_id: availableLine?.snapshot.supplierId,
            actualStock: { gte: 0 },
          },
          orderBy: { arriveDate: "asc" },
          select: {
            actualStock: true,
            compromised: true,
            arriveDate: true,
            batch_id: true,
            supplier_id: true,
            product_id: true,
          },
        });
        let desiredQuantity = availableLine?.snapshot.amount;
        const selectedBatches = [];
        let index = 0;
        while ((desiredQuantity as number) > 0) {
          const availableStock = databaseBatches[index].actualStock - databaseBatches[index].compromised;
          if (availableStock <= 0) { index++; continue; }
          const stockTaken = (desiredQuantity as number) > availableStock ? availableStock : desiredQuantity;
          desiredQuantity = (desiredQuantity as number) - availableStock;
          selectedBatches.push({ ...databaseBatches[index], stockTaken });
          index++;
        }
        for (const batch of selectedBatches) {
          await this.client.batch.update({
            where: {
              product_id_supplier_id_batch_id: {
                batch_id: batch.batch_id,
                product_id: batch.product_id,
                supplier_id: batch.supplier_id,
              },
            },
            data: {
              compromised: { increment: batch.stockTaken },
            },
          });
          await this.client.productxsupplier.update({
            where: {
              product_id_supplier_id: {
                product_id: batch.product_id,
                supplier_id: batch.supplier_id,
              },
            },
            data: {
              compromised: { increment: batch.stockTaken },
            },
          });
        }
        await this.client.product.update({
          where: {id: availableLine.snapshot.product.snapshot.id as number},
          data: {stock: {decrement: availableLine.snapshot.amount}}
        })
      })
    );
  }

  async unCompromiseSaleLine(saleLine: SaleLine): Promise<boolean> {
    if (!saleLine.snapshot.saleLineId)
      throw new Error("Sale line id is needed for unCompromiseSaleLine");
    const databaseBatches = await this.client.batch.findMany({
      where: {
        product_id: saleLine.snapshot.product.snapshot.id as number,
        supplier_id: saleLine.snapshot.supplierId,
        compromised: { gt: 0 },
      },
      orderBy: { arriveDate: "desc" },
    });
    if (!databaseBatches)
      throw new Error("There is no existence of this product");
    let amountToUnCompromise = saleLine.snapshot.amount;
    let index = 0;
    while (amountToUnCompromise > 0) {
      const amountTaked =
        amountToUnCompromise > databaseBatches[index].compromised
          ? databaseBatches[index].compromised
          : amountToUnCompromise;
      await this.client.batch.update({
        where: {
          product_id_supplier_id_batch_id: {
            batch_id: databaseBatches[index].batch_id,
            product_id: databaseBatches[index].product_id,
            supplier_id: databaseBatches[index].supplier_id,
          },
        },
        data: {
          compromised: { decrement: amountTaked },
        },
      });
      amountToUnCompromise -= amountTaked;
      index++;
    }
    await this.client.productxsupplier.update({
      where: {
        product_id_supplier_id: {
          product_id: saleLine.snapshot.product.snapshot.id as number,
          supplier_id: saleLine.snapshot.supplierId,
        },
      },
      data: { compromised: { decrement: saleLine.snapshot.amount } },
    });
    await this.client.product.update({
      where: {id: saleLine.snapshot.product.snapshot.id as number},
      data: {stock: {increment: saleLine.snapshot.amount}}
    })
    return true;
  }
}
