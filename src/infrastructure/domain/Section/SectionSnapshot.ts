import { iSnapshot } from "../../iSnapshot";
import { Product } from "../Product/Product";

export type SectionSnapshot = iSnapshot & {
    shelfId: number;
    sectionNumber?: number | null;
    capacity: number;
    product: Product;
}