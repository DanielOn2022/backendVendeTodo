import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Client } from "../infrastructure/domain/Client/Client";
import { ClientAlreadyExistsError } from "../infrastructure/domain/Client/ClientAlreadyExistsError";
import { ClientDoesntExistsError } from "../infrastructure/domain/Client/ClientDoesNotExistsError";
import { WrongCredentialsError } from "../infrastructure/domain/Client/WrongCredentialsError";
import { ClientFactory } from "../infrastructure/factories/ClientFactory";
import { ClientRepository } from "../infrastructure/repositories/ClientRepository";
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
      const cart = await cartModel.getCartByClientId(client.snapshot.id || 0);
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
      return client;
    }
}