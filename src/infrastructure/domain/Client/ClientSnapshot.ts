import { iSnapshot } from "../../iSnapshot";

export type ClientSnapshot = iSnapshot & {
    id?: number | null;
    name: string,
    cellphone?: string | null
    lastLoginDate: string,
    profileUrl?: string | null,
    email: string,
    password: string,
    createdAt: string,
    token?: string | null
}