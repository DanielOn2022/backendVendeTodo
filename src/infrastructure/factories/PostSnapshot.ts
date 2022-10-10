import { iSnapshot } from "../iSnapshot";

export type PostSnapshot = iSnapshot & {
  id?: number | null,
  title: string,
  body: string,
  published: boolean
}