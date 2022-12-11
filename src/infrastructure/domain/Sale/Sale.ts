import { iEntity } from "../../iEntity";
import { Payment } from "../Payment/Payment";
import { SaleLine } from "../SaleLine/SaleLine";
import { ShippingAddress } from "../ShippingAddress/ShippingAddress";
import { ShoppingCart } from "../ShopppingCart/ShoppingCart";
import { SaleSnapshot } from "./SaleSnapshot";

export class Sale implements iEntity {
  private readonly id?: number | null;
  private total: number;
  private date: Date;
  private payment: Payment;
  private shippingAddress: ShippingAddress;
  private completed: boolean;
  private saleLines?: SaleLine[] | null;

  constructor(data: {
    id?: number | null;
    total: number;
    date: Date;
    payment: Payment;
    shippingAddress: ShippingAddress;
    completed: boolean;
    saleLines?: SaleLine[] | null;
  }) {
    this.id = data.id;
    this.total = data.total;
    this.date = data.date;
    this.payment = data.payment;
    this.shippingAddress = data.shippingAddress;
    this.completed = data.completed;
    this.saleLines = data.saleLines;
  }

  get snapshot(): SaleSnapshot {
    return {
      id: this.id,
      total: this.total,
      date: this.date,
      payment: this.payment,
      shippingAddress: this.shippingAddress,
      completed: this.completed,
      saleLines: this.saleLines,
    };
  }

  setLines(cart: ShoppingCart): void {
    this.saleLines = [];
    cart.snapshot.saleLines?.forEach(saleLine => {
      this.saleLines?.push(new SaleLine({
        amount: saleLine.snapshot.amount,
        cart_sale_id: this.id as number,
        product: saleLine.snapshot.product,
        supplierId: saleLine.snapshot.supplierId,
        batchId: saleLine.snapshot.batchId,
        price: saleLine.snapshot.price,
        saleLineId: saleLine.snapshot.saleLineId,
        subTotal: saleLine.snapshot.subTotal,
      }));
    });
  }

  getSaleLines(): SaleLine[] | [] {
    return this.saleLines || [];
  }
}
