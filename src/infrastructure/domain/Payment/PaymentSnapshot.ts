import { iSnapshot } from "../../iSnapshot";
import { PaymentMethod } from "../PaymenthMethod/PaymentMethod";

export type PaymentSnapshot = iSnapshot & {
    id?: number | null;
    amount: number;
    paymentMethod: PaymentMethod;
    concept: string;
    reference?: string | null;
}