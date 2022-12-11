import { iSnapshot } from "../../iSnapshot";
import { PaymentMethod } from "../PaymenthMethod/PaymentMethod";

export type EmployeeSnapshot = iSnapshot & {
    id?: number | null;
    name: string;
    cellphone: string;
    rfc: string;
    city: string;
    street: string;
    externalNumber: string;
    internalNumber?: string | null;
    email: string;
    password: string;
}