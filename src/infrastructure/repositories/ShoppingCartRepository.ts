import { PrismaClient } from '@prisma/client';
import { SaleLine } from '../domain/SaleLine/SaleLine';
import { ShoppingCart } from '../domain/ShopppingCart/ShoppingCart';
import { SaleLineFactory } from '../factories/CartLineFactory';
import { ShopppingCartFactory } from '../factories/ShoppingCartFactory';

export class ShopppingCartRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async getCartByClientId(clientId: number): Promise<ShoppingCart | null> {
    const databaseCart = await this.client.shoppingcart.findUnique({where: {id: clientId}});
    if (!databaseCart) return null;
    return ShopppingCartFactory.createFromPrisma(databaseCart);
  }

  async addSaleLineToCart(cart: ShoppingCart, saleLine: SaleLine): Promise<SaleLine[] | null> {
    const databaseBatches = await this.client.batch.findMany({
      where: {
        product_id: saleLine.snapshot.product.snapshot.id || 0,
        supplier_id: saleLine.snapshot.supplierId,
        actualStock: {gte: 0}
      },
      orderBy: {arriveDate: 'asc',},
      select: {actualStock: true, compromised: true, arriveDate: true, batch_id: true}
    });
    let desiredQuantity = saleLine.snapshot.amount;
    const selectedBatches = [];
    let index = 0;
    while(desiredQuantity > 0) {
      const availableStock = databaseBatches[index].actualStock - databaseBatches[index].compromised;
      const stockTaken = desiredQuantity > availableStock ? availableStock : desiredQuantity;
      desiredQuantity = desiredQuantity - availableStock;
      selectedBatches.push({...databaseBatches[index], stockTaken});
      index++;
    }
    let cartLineId = 0;
    const [lastCartLine] = await this.client.cartline.findMany({where: {shoppingCart_id: cart.snapshot.id as number}, orderBy: {cartLine_id: 'desc'}, take: 1});
    cartLineId = lastCartLine ? lastCartLine.cartLine_id: cartLineId;
    const databaseSaleLines = await Promise.all(
      selectedBatches.map(async (batch) => {
        cartLineId = cartLineId + 1;
        const databaseSaleLine = await this.client.cartline.create({
          data: {
            batch_id: batch.batch_id,
            cartLine_id: cartLineId,
            amount: batch.stockTaken,
            product_id: saleLine.snapshot.product.snapshot.id as number,
            shoppingCart_id: cart.snapshot.id as number,
            supplier_id: saleLine.snapshot.supplierId,
            price: saleLine.snapshot.price,
            subtotal: batch.stockTaken * (saleLine.snapshot.price as unknown as number)            
          }
        });
        return databaseSaleLine;
      })
    );
    return SaleLineFactory.createManyFromPrismaWithSameProduct(databaseSaleLines, saleLine.snapshot.product);
  }

  async updateCartActivity(cart: ShoppingCart): Promise<ShoppingCart | null> {
    const databaseCart = await this.client.shoppingcart.update({
      where: {id: cart.snapshot.id as number},
      data: {lastUpdate: cart.snapshot.lastUpdate}
    });
    if (!databaseCart) return null;
    return ShopppingCartFactory.createFromPrisma(databaseCart);
  }
}