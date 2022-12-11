import { iSnapshot } from "../../iSnapshot";
import { Payment } from "../Payment/Payment";
import { PaymentMethod } from "../PaymenthMethod/PaymentMethod";
import { SaleLine } from "../SaleLine/SaleLine";
import { ShippingAddress } from "../ShippingAddress/ShippingAddress";

export type SaleSnapshot = iSnapshot & {
    id?: number | null;
    total: number;
    date: Date;
    payment: Payment;
    shippingAddress: ShippingAddress;
    completed: boolean;
    saleLines?: SaleLine[] | null;
}