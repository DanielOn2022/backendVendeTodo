import { iSnapshot } from "../../iSnapshot";

export type SupplierSnapshot = iSnapshot & {
    id?: number | null;
    name?: string | null,
    cellphone?: string | null,
    company: string
}