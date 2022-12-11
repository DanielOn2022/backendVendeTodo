import { PrismaClient } from "@prisma/client";
import { ExternalPaymentService } from "../infrastructure/domain/ExternalPaymentService/ExternalPaymentService";
import { PaymentRejectedError } from "../infrastructure/domain/Payment/PaymantRejectedError";
import { Payment } from "../infrastructure/domain/Payment/Payment";
import { PaymentMethod } from "../infrastructure/domain/PaymenthMethod/PaymentMethod";
import { SaleLine } from "../infrastructure/domain/SaleLine/SaleLine";
import { ShippingAddress } from "../infrastructure/domain/ShippingAddress/ShippingAddress";
import { ShoppingCart } from "../infrastructure/domain/ShopppingCart/ShoppingCart";
import { PaymentFactory } from "../infrastructure/factories/PaymentFactory";
import { PackerRepository } from "../infrastructure/repositories/PackerRepository";
import { PaymentRepository } from "../infrastructure/repositories/PaymentRepository";
import { SaleLineRepository } from "../infrastructure/repositories/SaleLineRepository";
import { SaleRepository } from "../infrastructure/repositories/SaleRepository";
import { ShopppingCartRepository } from "../infrastructure/repositories/ShoppingCartRepository";

export class PaymentModel {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  
  async authorizePayment(paymentMethod: PaymentMethod, shoppingCart: ShoppingCart, shippingAddress: ShippingAddress) {
    let payment: Payment | null = PaymentFactory.createWithMinimalInput({
      amount: shoppingCart.getTotal(shoppingCart.getLines() as SaleLine[]), 
      concept: 'Pago realizado por productos en Vende Todo punto com', 
      paymentMethod
    });

    const wasAuthorized = ExternalPaymentService.authorizePayment(payment);
    if (!wasAuthorized) throw new PaymentRejectedError("Payment rejected", {
      component: "authorizePayment",
      input: { payment },
    });

    const paymentRepo = new PaymentRepository(this.prisma);
    const saleRepo = new SaleRepository(this.prisma);
    const packerRepo = new PackerRepository(this.prisma);
    const saleLineRepo = new SaleLineRepository(this.prisma);
    const shoppingCartRepo = new ShopppingCartRepository(this.prisma);
    payment = await paymentRepo.createPayment(payment);
    if (!payment) throw new Error('Something went wron creating the payment');
    const sale = await saleRepo.createSale(payment, shoppingCart, shippingAddress);
    if (!sale) throw new Error('Somenthing went wrong');
    sale.setLines(shoppingCart);
    await saleLineRepo.createSaleLinesForSale(sale);
    await shoppingCartRepo.removeAllSaleLines(shoppingCart);
    shoppingCart.clearCart();
    const packer = await packerRepo.getPackerWithFewerSales();
    const addedSuccessfully = await packerRepo.addSaleToPacker(sale, packer);
    if (!addedSuccessfully) throw new Error('Somenthing went wrong adding the sale to packer');

    return {
      payment,
      shoppingCart,
      sale
    };
  }

  
}