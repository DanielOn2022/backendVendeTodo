import { PrismaClient} from "@prisma/client";
import { Payment } from "../domain/Payment/Payment";
import { Sale } from "../domain/Sale/Sale";
import { SaleLine } from "../domain/SaleLine/SaleLine";
import { ShippingAddress } from "../domain/ShippingAddress/ShippingAddress";
import { ShoppingCart } from "../domain/ShopppingCart/ShoppingCart";
import { SaleFactory } from "../factories/SaleFactory";

export class SaleRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async createSale(payment: Payment, cart: ShoppingCart, shippingAddress: ShippingAddress): Promise<Sale | null> {
    if (!payment.snapshot.id) throw new Error('The payment must be created in databse first');
    const databaseSale = await this.client.sale.create({
      data: {
        completed: false,
        date: new Date(),
        payment_id: payment.snapshot.id,
        shippingAddress_id: shippingAddress.snapshot.id as number,
        total: cart.getTotal(cart.getLines() as SaleLine[]),
      }
    });
    if (!databaseSale) return null;
    return SaleFactory.createFromPrisma({databaseSale, payment, shippingAddress});
  }
}
