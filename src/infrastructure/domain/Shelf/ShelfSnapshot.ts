import { iSnapshot } from "../../iSnapshot";
import { SaleLine } from "../SaleLine/SaleLine";
import { Section } from "../Section/Section";

export type ShelfSnapshot = iSnapshot & {
    id? : number | null;
    warehouseManagerId: number;
    shelfManagerId: number;
    sortedDate: Date;
    sections?: Section[] | [];
}