import { iSnapshot } from "../../iSnapshot";
import { PaymentMethod } from "../PaymenthMethod/PaymentMethod";
import { Role } from "./Employee";

export type EmployeeSnapshot = iSnapshot & {
    id?: number | null;
    name: string;
    cellphone?: string | null;
    rfc: string;
    city?: string | null;
    street?: string | null;
    externalNumber?: string | null;
    internalNumber?: string | null;
    email: string;
    password: string;
    token?: string | null;
    role?: Role | null;
}