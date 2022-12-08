import { Decimal } from "@prisma/client/runtime";
import { iSnapshot } from "../../iSnapshot";

export type ProductSnapshot = iSnapshot & {
  id?: number | null,
  name: string;
  description?: string | null;
  brand?: string | null;
  price: Decimal;
  volume?: Decimal | null;
  imageUrl: string;
  stock?: number | null;
}