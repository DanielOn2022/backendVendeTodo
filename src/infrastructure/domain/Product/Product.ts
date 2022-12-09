import { ProductSnapshot } from "./ProductSnapshot";
import { iEntity } from "../../iEntity";
import { Decimal } from "@prisma/client/runtime";
import { Supplier } from "../Supplier/Supplier";

export class Product implements iEntity {
  private readonly id?: number | null;
  private name: string;
  private description?: string | null;
  private brand?: string | null;
  private price: Decimal;
  private volume?: Decimal | null;
  private imageUrl: string;
  private stock?: number | null;
  private suppliers?: Array<Supplier> | [];

  constructor(data: {
    id?: number | null;
    name: string;
    description?: string | null;
    brand?: string | null;
    price: Decimal;
    volume?: Decimal | null;
    imageUrl: string;
    stock?: number | null;
    suppliers?: Array<Supplier> | null
  }) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.brand = data.brand;
    this.price = data.price;
    this.volume = data.volume;
    this.imageUrl = data.imageUrl;
    this.stock = data.stock;
    this.suppliers = data.suppliers || [];
  }

  get snapshot(): ProductSnapshot {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      brand: this.brand,
      price: this.price,
      volume: this.volume,
      imageUrl: this.imageUrl,
      stock: this.stock,
      suppliers: this.suppliers || []
    };
  }

  updateValues(newName: string, newPrice: Decimal, newBrand: string): void {
    this.name = newName;
    this.price = newPrice;
    this.brand = newBrand;
  }

  setSuppliers(suppliers: Array<Supplier>) {
    this.suppliers = suppliers;
  }
}
