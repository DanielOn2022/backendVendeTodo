import { PostSnapshot } from "../../factories/PostSnapshot";
import { iEntity } from "../../iEntity";


export class Post implements iEntity {
  private readonly id?: number | null
  private title: string
  private body: string
  private published: boolean  

  constructor(data: { id?: number | null, title: string, body: string, published: boolean }) {
    this.id = data.id;
    this.title = data.title;
    this.body = data.body;
    this.published = data.published;
  }

  get snapshot(): PostSnapshot {
    return {
      id: this.id,
      title: this.title,
      body: this.body,
      published: this.published
    }
  }
}