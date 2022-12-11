import { iSnapshot } from "../../iSnapshot";

export type PackerSnapshot = iSnapshot & {
    packer_id?: number | null;
    startingPoint: number;
}