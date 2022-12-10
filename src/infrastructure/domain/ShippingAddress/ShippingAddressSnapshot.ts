import { iSnapshot } from "../../iSnapshot";
import { SaleLine } from "../SaleLine/SaleLine";

export type ShippingAddressSnapshot = iSnapshot & {
    id? : number | null;
    city: string;
    street: string;
    externalNumber: number;
    internalNumber?: number | null;
    clientId: number;
}