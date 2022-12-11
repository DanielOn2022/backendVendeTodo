import { PrismaClient, product } from '@prisma/client';
import { Client } from '../domain/Client/Client';
import { SaleLine } from '../domain/SaleLine/SaleLine';
import { ShoppingCart } from '../domain/ShopppingCart/ShoppingCart';
import { Supplier } from '../domain/Supplier/Supplier';
import { SaleLineFactory } from '../factories/CartLineFactory';
import { ProductFactory } from '../factories/ProductFactory';
import { ShopppingCartFactory } from '../factories/ShoppingCartFactory';

export class ShopppingCartRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async getCartByClientId(clientId: number): Promise<ShoppingCart | null> {
    const databaseCart = await this.client.shoppingcart.findFirst({where: {client_id: clientId}});
    if (!databaseCart) return null;
    return ShopppingCartFactory.createFromPrisma(databaseCart);
  }

  async getSaleLinesByCart(cart: ShoppingCart): Promise<SaleLine[] | null> {
    const databaseLines = await this.client.cartline.findMany({
      where: {shoppingCart_id: cart.snapshot.id as number}
    });
    if (!databaseLines) return null;
    const saleLines = [];
    for (const databaseLine of databaseLines) {
      const databaseProduct = await this.client.product.findUnique({where: {id: databaseLine.product_id}});
      const product = ProductFactory.createFromPrisma(databaseProduct as product);
      const databaseSupplier = await this.client.supplier.findUnique({where: {id: databaseLine.supplier_id}});
      if (!databaseSupplier) throw new Error('No supplier found');
      const saleLine = SaleLineFactory.createFromPrisma(databaseLine, product);
      saleLine.setSupplierInfo(new Supplier({company: databaseSupplier.company, id: databaseSupplier.id}));
      saleLines.push(saleLine);
    }
    return saleLines;
  }

  async addSaleLineToCart(cart: ShoppingCart, saleLine: SaleLine): Promise<SaleLine[] | null> {
    const databaseBatches = await this.client.batch.findMany({
      where: {
        product_id: saleLine.snapshot.product.snapshot.id as number,
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
      if (!databaseBatches[index]) throw new Error('Not enough stock for this product');
      const availableStock = databaseBatches[index].actualStock - databaseBatches[index].compromised;
      if (availableStock <= 0) { index++; continue;}
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

  async createCartForClient(client: Client): Promise<ShoppingCart | null> {
    if (!client.snapshot.id) throw new Error('Client id is needed for createCartForClient');
    const databaseCart = await this.client.shoppingcart.create({
      data: {
        createdAt: new Date(),
        lastUpdate: new Date(),
        client_id: client.snapshot.id,
      }
    });
    if (!databaseCart) return null;
    return ShopppingCartFactory.createFromPrisma(databaseCart);
  }

  async removeSaleLineFromCart(cart: ShoppingCart, saleLineId: number): Promise<boolean> {
    const databaseSaleLine = await this.client.cartline.delete({
      where: {
        shoppingCart_id_cartLine_id: {cartLine_id: saleLineId, shoppingCart_id: cart.snapshot.id as number}
      }
    });
    if (!databaseSaleLine) return false;
    return true
  }

  async removeAllSaleLines(cart: ShoppingCart): Promise<boolean> {
    const databaseCart = await this.client.cartline.deleteMany({
      where: {
        shoppingCart_id: cart.snapshot.id as number
      }
    });
    if (!databaseCart) return false;
    return true;
  }
}