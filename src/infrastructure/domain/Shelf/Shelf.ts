import { iEntity } from "../../iEntity";
import { Product } from "../Product/Product";
import { Section } from "../Section/Section";
import { ShelfSnapshot } from "./ShelfSnapshot";

export class Shelf implements iEntity {

  private id? : number | null;
  private warehouseManagerId: number;
  private shelfManagerId: number;
  private sortedDate: Date;
  private sections?: Section[] | [];

  constructor(data: {
    id? : number | null;
    warehouseManagerId: number;
    shelfManagerId: number;
    sortedDate: Date;
    sections?: Section[] | [];
  }) {
    this.id = data.id;
    this.warehouseManagerId = data.warehouseManagerId;
    this.shelfManagerId = data.shelfManagerId;
    this.sortedDate = data.sortedDate;
    this.sections = data.sections;
  }

  get snapshot(): ShelfSnapshot {
    return {
      id: this.id,
      warehouseManagerId: this.warehouseManagerId,
      shelfManagerId: this.shelfManagerId,
      sortedDate: this.sortedDate,
      sections: this.sections,
    };
  }

  getProducts(): Product[] | [] {
    if (!this.sections) return [];
    return this.sections?.map(section => {
      return section.snapshot.product;
    });
  }

  setNewOrder(products: Product[]): void {
    if (!this.sections) throw new Error('Shelf has no sections');
    let sectionNumber = 0;
    while(sectionNumber < this.sections?.length) {
      const section = this.sections.find(sectionItem => sectionItem.snapshot.sectionNumber === sectionNumber+1);
      section?.setProduct(products[sectionNumber]);
      sectionNumber++;
    }
  }

  calculateProductsOnShelf(products: Product[]): Product[] | [] {
    const newProductsOnShelf: any = [];
    if (!this.sections) return [];
    products.forEach(product => {
      const productInShelf = this.sections?.find(section => section.snapshot.product.snapshot.id === product.snapshot.id);
      if (productInShelf) newProductsOnShelf.push(productInShelf.snapshot.product);
    });
    return newProductsOnShelf;
  }

}