import { iEntity } from "../../iEntity";
import { EmployeeSnapshot } from "./EmployeeSnapshot";

export class Employee implements iEntity {
  private readonly id?: number | null;
  private name: string;
  private cellphone: string;
  private rfc: string;
  private city: string;
  private street: string;
  private externalNumber: string;
  private internalNumber?: string | null;
  private email: string;
  private password: string;

  constructor(data: {
    id?: number | null;
    name: string;
    cellphone: string;
    rfc: string;
    city: string;
    street: string;
    externalNumber: string;
    internalNumber?: string | null;
    email: string;
    password: string;
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
    };
  }
}
