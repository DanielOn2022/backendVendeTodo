import { Decimal } from "@prisma/client/runtime";
import { iSnapshot } from "../../iSnapshot";
import { Product } from "../Product/Product";

export type SaleLineSnapshot = iSnapshot & {
    cart_sale_id: number;
    saleLineId?: number | null;
    product: Product;
    supplierId: number;
    batchId?: number | null;
    amount: number;
    price?: Decimal | null;
    subTotal?: Decimal | null;
}