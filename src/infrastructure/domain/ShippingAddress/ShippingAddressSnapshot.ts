import { iSnapshot } from "../../iSnapshot";
import { SaleLine } from "../SaleLine/SaleLine";

export type ShippingAddressSnapshot = iSnapshot & {
    id? : number | null;
    city: string;
    street: string;
    externalNumber: string;
    internalNumber?: string | null;
    clientId: number;
}