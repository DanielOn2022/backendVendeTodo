import { iSnapshot } from "../../iSnapshot";

export type ProductSnapshot = iSnapshot & {
  id?: number | null,
  name: string,
  brand: string,
  price: number
}