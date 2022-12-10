import { Decimal } from "@prisma/client/runtime";
import { iSnapshot } from "../../iSnapshot";
import { Supplier } from "../Supplier/Supplier";

export type PaymentMethodSnapshot = iSnapshot & {
    cardNumber?: number | null;
    clientId: number;
}