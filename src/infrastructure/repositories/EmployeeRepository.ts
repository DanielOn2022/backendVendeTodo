import { packer, PrismaClient, shelfmanager, warehousemanager} from "@prisma/client";
import e from "express";
import { Employee } from "../domain/Employee/Employee";
import { Packer } from "../domain/Packer/Packer";
import { Payment } from "../domain/Payment/Payment";
import { Sale } from "../domain/Sale/Sale";
import { SaleLine } from "../domain/SaleLine/SaleLine";
import { ShippingAddress } from "../domain/ShippingAddress/ShippingAddress";
import { ShoppingCart } from "../domain/ShopppingCart/ShoppingCart";
import { EmployeeFactory } from "../factories/EmployeeFactory";
import { SaleFactory } from "../factories/SaleFactory";

export class EmployeeRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async getEmployeeByEmail(email: string): Promise<Employee | null> {
    const databaseEmployee = await this.client.employee.findUnique({where: {email}});
    console.log(databaseEmployee);
    if (!databaseEmployee) return null;
    return EmployeeFactory.createFromPrisma(databaseEmployee);
  }

  async createEmployee(employee: Employee): Promise<Employee | null> {
    const databaseEmployee = await this.client.employee.create({
      data: {
        name: employee.snapshot.name,
        email: employee.snapshot.email,
        password: employee.snapshot.password,
        rfc: employee.snapshot.rfc,
        createdAt: new Date(),
      }
    });
    if (!databaseEmployee) return null;
    return EmployeeFactory.createFromPrisma(databaseEmployee);
  }

  async getRoleById(employeeId: number): Promise<packer | shelfmanager | warehousemanager | null> {
    let databaseEmployee: any = await this.client.packer.findFirst({
      where: {employee_id: employeeId}
    });
    if (databaseEmployee) return databaseEmployee;
    databaseEmployee = await this.client.warehousemanager.findFirst({
      where: {employee_id: employeeId}
    });
    if (databaseEmployee) return databaseEmployee;
    databaseEmployee = await this.client.shelfmanager.findFirst({
      where: {employee_id: employeeId}
    });
    if (databaseEmployee) return databaseEmployee;
    return null;
  }
}
