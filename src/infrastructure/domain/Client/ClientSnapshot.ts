import { iSnapshot } from "../../iSnapshot";
import { ShoppingCart } from "../ShopppingCart/ShoppingCart";

export type ClientSnapshot = iSnapshot & {
    id?: number | null;
    name: string,
    cellphone?: string | null
    lastLoginDate: string,
    profileUrl?: string | null,
    email: string,
    password: string,
    createdAt: string,
    token?: string | null,
    shoppingCart?: ShoppingCart | null;
}