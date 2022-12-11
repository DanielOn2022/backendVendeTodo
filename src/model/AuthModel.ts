import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Client } from "../infrastructure/domain/Client/Client";
import { ClientAlreadyExistsError } from "../infrastructure/domain/Client/ClientAlreadyExistsError";
import { ClientDoesntExistsError } from "../infrastructure/domain/Client/ClientDoesNotExistsError";
import { WrongCredentialsError } from "../infrastructure/domain/Client/WrongCredentialsError";
import { Employee } from "../infrastructure/domain/Employee/Employee";
import { ClientFactory } from "../infrastructure/factories/ClientFactory";
import { EmployeeFactory } from "../infrastructure/factories/EmployeeFactory";
import { ClientRepository } from "../infrastructure/repositories/ClientRepository";
import { EmployeeRepository } from "../infrastructure/repositories/EmployeeRepository";
import { ShopppingCartRepository } from "../infrastructure/repositories/ShoppingCartRepository";
import { CartModel } from "./CartModel";

export class AuthModel {
    private prisma: PrismaClient;
  
    constructor(prisma: PrismaClient) {
      this.prisma = prisma;
    }

    async login(email: string, password: string) {
      const clientRepo = new ClientRepository(this.prisma);
      const client = await clientRepo.getClientByEmail(email);
      if (!client) throw new ClientDoesntExistsError("Wrong credentials", {
        component: "login",
        input: { email },
      });
      
      const isValidPassword = await bcrypt.compare(password, client.snapshot.password || '');
      
      if (!isValidPassword) throw new WrongCredentialsError("Wrong credentials", {
        component: "login",
        input: { email, password },
      });

      const token = jwt.sign({
        id: client?.snapshot.id, email: client.snapshot.email, name: client.snapshot.name
      }, `${process.env.SERVER_SECRET}`, {expiresIn: '1d'});

      client.setToken(token);
      const succeded = await clientRepo.setTokenToClient(client);
      if (!succeded) throw new Error('Something went wrong setting users token');

      const cartModel = new CartModel(this.prisma);
      const cart = await cartModel.getCartByClientId(client.snapshot.id as number);
      if (!cart) throw new Error('Something went wrong getting clients cart');
      if (cart) client.setCart(cart);
      return client;
    }

    async register(data: { name: string, email: string, password: string, cellphone?: string | null, lastname?: string | null }) {
      const {email, name, password, lastname, cellphone} = data;
      const clientRepo = new ClientRepository(this.prisma);
      const oldClient = await clientRepo.getClientByEmail(email);
      if (oldClient) throw new ClientAlreadyExistsError("Client with email already exists", {
        component: "login",
        input: { email },
      });

      const encryptedPassword = await bcrypt.hash(password, 10);
      let client: Client | null = ClientFactory.createWithMinimalInput({email, name: `${name} ${lastname}`, password: encryptedPassword, cellphone});
      client = await clientRepo.createClient(client);
      if (!client) throw new Error('Something went wrong');
      const token = jwt.sign({
        id: client?.snapshot.id, email: client.snapshot.email, name: client.snapshot.name
      }, `${process.env.SERVER_SECRET}`, {expiresIn: '1d'});
      
      client.setToken(token);
      const succeded = await clientRepo.setTokenToClient(client);
      if (!succeded) throw new Error('Something went wrong setting users token');

      const cartRepo = new ShopppingCartRepository(this.prisma);
      const newCart = await cartRepo.createCartForClient(client);
      if (!newCart) throw new Error('Something went wrong creating clients Cart');
      client.setCart(newCart);
      return client;
    }

  async loginEmployee(email: string, password: string) {
    const employeeRpo = new EmployeeRepository(this.prisma);
    const employee = await employeeRpo.getEmployeeByEmail(email);
    if (!employee) throw new ClientDoesntExistsError("Wrong credentials", {
      component: "loginEmployee",
      input: { email },
    });
    
    const isValidPassword = await bcrypt.compare(password, employee.snapshot.password || '');
    
    if (!isValidPassword) throw new WrongCredentialsError("Wrong credentials", {
      component: "login",
      input: { email, password },
    });
    const role = await employeeRpo.getRoleById(employee.snapshot.id as number);
    if (!role) throw new Error('Employee doesnt have a role yet');
    const token = jwt.sign({
      id: employee?.snapshot.id, email: employee.snapshot.email, name: employee.snapshot.name, role: role.role
    }, `${process.env.SERVER_SECRET}`, {expiresIn: '1d'});
    employee.setToken(token);
    employee.setRole(role.role);
    return employee;
  }

  async registerEmployee(data: { name: string, email: string, password: string, rfc: string, lastname?: string | null }) {
    const {email, name, password, lastname, rfc} = data;
    const employeeRpo = new EmployeeRepository(this.prisma);
    const oldEmployee = await employeeRpo.getEmployeeByEmail(email);
    if (oldEmployee) throw new ClientAlreadyExistsError("Client with email already exists", {
      component: "login",
      input: { email },
    });

    const encryptedPassword = await bcrypt.hash(password, 10);
    let employee : Employee | null = EmployeeFactory.createWithMinimalInput({email, name: `${name} ${lastname}`, password: encryptedPassword, rfc});
    employee = await employeeRpo.createEmployee(employee);
    if (!employee) throw new Error('Something went wrong');
    const token = jwt.sign({
      id: employee?.snapshot.id, email: employee.snapshot.email, name: employee.snapshot.name, role: null
    }, `${process.env.SERVER_SECRET}`, {expiresIn: '1d'});
    
    employee.setToken(token);

    return employee;
  }
}