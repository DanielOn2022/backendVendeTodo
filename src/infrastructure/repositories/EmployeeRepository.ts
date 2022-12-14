import { packer, PrismaClient, shelfmanager, warehousemanager } from "@prisma/client";
import { Employee, Role } from "../domain/Employee/Employee";
import { EmployeeFactory } from "../factories/EmployeeFactory";

export class EmployeeRepository {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async getEmployeeByEmail(email: string): Promise<Employee | null> {
    const databaseEmployee = await this.client.employee.findUnique({where: {email}});
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

  async getRoleById(employeeId: number): Promise<{role: Role, roleInfo: packer | warehousemanager | shelfmanager} | null> {
    let databaseEmployee: any = await this.client.packer.findFirst({
      where: {employee_id: employeeId}
    });
    if (databaseEmployee) return {role: Role.packer, roleInfo: databaseEmployee};
    databaseEmployee = await this.client.warehousemanager.findFirst({
      where: {employee_id: employeeId}
    });
    if (databaseEmployee) return {role: Role.warehouseManager, roleInfo: databaseEmployee};
    databaseEmployee = await this.client.shelfmanager.findFirst({
      where: {employee_id: employeeId}
    });
    if (databaseEmployee) return {role: Role.shelfManager, roleInfo: databaseEmployee};
    return null;
  }

  async getRoleInfo(role: string, employeeId: number): Promise<{roleId: number} | null>  {
    if (role == Role.packer) {
      const databasePacker = await this.client.packer.findFirst({
        where: {employee_id: employeeId}
      });
      if (!databasePacker) return null;
      return {roleId: databasePacker?.packer_id};
    }
    if (role == Role.shelfManager) {
      const databaseShelManager = await this.client.shelfmanager.findFirst({
        where: {employee_id: employeeId}
      });
      if (!databaseShelManager) return null;
      return {roleId: databaseShelManager?.shelfManager_id};
    }
    if (role == Role.warehouseManager) {
      const databaseWarehouseManager = await this.client.warehousemanager.findFirst({
        where: {employee_id: employeeId}
      });
      if (!databaseWarehouseManager) return null;
      return {roleId: databaseWarehouseManager?.warehouseManager_id};
    }
    return null;
  }
}
