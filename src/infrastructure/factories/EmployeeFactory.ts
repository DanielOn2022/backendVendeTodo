import { employee, packer as PackerPrisma } from '@prisma/client';
import { Client } from '../domain/Client/Client';
import moment from 'moment';
import { Packer } from '../domain/Packer/Packer';
import { Employee } from '../domain/Employee/Employee';


export class EmployeeFactory {
  static createFromPrisma(employee: employee): Employee {
    return new Employee({
      cellphone: employee.cellphone,
      city: employee.city,
      email: employee.email,
      externalNumber: employee.externalNumber,
      name: employee.name,
      password: employee.password,
      rfc: employee.rfc,
      street: employee.street,
      id: employee.id,
      internalNumber: employee.internalNumber,
    });
  }

  static createWithMinimalInput(employee: {
    email: string,
    name: string,
    password: string,
    rfc: string
  }): Employee {
    return new Employee({
      email: employee.email,
      name: employee.name,
      password: employee.password,
      rfc: employee.rfc
    })
  }
}