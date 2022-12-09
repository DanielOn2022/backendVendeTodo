import { iEntity } from "../../iEntity";
import { ShoppingCart } from "../ShopppingCart/ShoppingCart";
import { ClientSnapshot } from "./ClientSnapshot";

export class Client implements iEntity {

  private readonly id?: number | null;
  private name: string;
  private cellphone?: string | null;
  private lastLoginDate: string;
  private profileUrl?: string | null;
  private email: string;
  private password: string;
  private createdAt: string;
  private token?: string | null;
  private shoppingCart?: ShoppingCart | null;

  constructor(data: {
    id?: number | null;
    name: string;
    cellphone?: string | null;
    lastLoginDate: string;
    profileUrl?: string | null;
    email: string;
    password: string;
    createdAt: string;
    token?: string | null;
    shoppingCart?: ShoppingCart | null;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.cellphone = data.cellphone;
    this.lastLoginDate = data.lastLoginDate;
    this.profileUrl = data.profileUrl;
    this.email = data.email;
    this.password = data.password;
    this.createdAt = data.createdAt;
    this.token = data.token;
    this.shoppingCart = data.shoppingCart;
    this.isSatisfied();
  }

  private isSatisfied() {
    if (!this.email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) throw new Error('Not a valid email');
  }

  get snapshot(): ClientSnapshot {
    return {
      id: this.id,
      name: this.name,
      cellphone: this.cellphone,
      lastLoginDate: this.lastLoginDate,
      profileUrl: this.profileUrl,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
      token: this.token,
      shoppingCart: this.shoppingCart
    };
  }

  setToken(token: string): void {
    this.token = token;
  }

  setCart(shoppingCart: ShoppingCart): void {
    this.shoppingCart = shoppingCart;
  }

}