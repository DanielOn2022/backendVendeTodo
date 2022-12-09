import { iSnapshot } from "../../iSnapshot";
import { SaleLine } from "../SaleLine/SaleLine";

export type ShoppingCartSnapshot = iSnapshot & {
    id?: number | null;
    lastUpdate: Date;
    saleLines?: Array<SaleLine> | [];
}