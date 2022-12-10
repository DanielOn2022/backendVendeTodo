import { shippingaddress as ShippingAddressPrisma } from '@prisma/client';
import { ShippingAddress } from '../domain/ShippingAddress/ShippingAddress';


export class ShippingAddressFactory {
  static createFromPrisma(address: ShippingAddressPrisma): ShippingAddress {
    return new ShippingAddress({
      id: address.id,
      city: address.city, 
      clientId: address.client_id,
      externalNumber: address.externalNumber,
      street: address.street,
      internalNumber: address.internalNumber
    });
  }

  static createManyFromPrisma(databaseShippingAddresses: ShippingAddressPrisma[]): ShippingAddress[] {
    return databaseShippingAddresses.map(databaseShippingAddress => this.createFromPrisma(databaseShippingAddress));
  }
}