import { employee, packer as PackerPrisma } from '@prisma/client';
import { Client } from '../domain/Client/Client';
import moment from 'moment';
import { Packer } from '../domain/Packer/Packer';
import { Employee } from '../domain/Employee/Employee';


export class PackerFactory {
  static createFromPrisma(data: {packer: PackerPrisma, employee: employee}): Packer {
    return new Packer({
      baseData: {
        cellphone: data.employee.cellphone,
        city: data.employee.city,
        email: data.employee.email,
        externalNumber: data.employee.externalNumber,
        name: data.employee.name,
        password: data.employee.password,
        rfc: data.employee.rfc,
        street: data.employee.street,
        id: data.employee.id,
        internalNumber: data.employee.internalNumber,
      },
      startingPoint: data.packer.startingPoint,
      packer_id: data.packer.packer_id
    });
  }
}