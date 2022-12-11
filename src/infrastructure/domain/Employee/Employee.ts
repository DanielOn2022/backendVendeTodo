import { iEntity } from "../../iEntity";
import { EmployeeSnapshot } from "./EmployeeSnapshot";

export class Employee implements iEntity {
  private readonly id?: number | null;
  private name: string;
  private cellphone?: string | null;
  private rfc: string;
  private city?: string | null;
  private street?: string | null;
  private externalNumber?: string | null;
  private internalNumber?: string | null;
  private email: string;
  private password: string;
  private token?: string | null;

  constructor(data: {
    id?: number | null;
    name: string;
    cellphone?: string | null;
    rfc: string;
    city?: string | null;
    street?: string | null;
    externalNumber?: string | null;
    internalNumber?: string | null;
    email: string;
    password: string;
    token?: string | null;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.cellphone = data.cellphone;
    this.rfc = data.rfc;
    this.city = data.city;
    this.street = data.street;
    this.externalNumber = data.externalNumber;
    this.internalNumber = data.internalNumber;
    this.email = data.email;
    this.password = data.password;
    this.isSatisfied();
  }

  get snapshot(): EmployeeSnapshot {
    return {
      id: this.id,
      name: this.name,
      cellphone: this.cellphone,
      rfc: this.rfc,
      city: this.city,
      street: this.street,
      externalNumber: this.externalNumber,
      internalNumber: this.internalNumber,
      email: this.email,
      password: this.password,
      token: this.token,
    };
  }

  private isSatisfied() {
    if (!this.email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )) throw new Error('Not a valid email');
  }

  setToken(token: string): void {
    this.token = token;
  }
}
