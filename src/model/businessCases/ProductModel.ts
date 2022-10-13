import { PrismaClient, Product } from '@prisma/client';
import { ProductDoesntExistsError } from '../../infrastructure/domain/product/ProductDoesNotExistError';
import {ProductRepository } from '../../infrastructure/repositories/ProductRepository';

export class ProductModel {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }




async updateProduct(productId: number, newName: string, newPrice: number, newBrand: string){


  const productRepository = new ProductRepository(this.prisma);
  let product = await productRepository.getProductById(productId);
  
  if (!product) throw new ProductDoesntExistsError('Product does not exists', {
    component: 'updateProduct',
    input: {productId}
  });
  product.updateValues(newName,newPrice,newBrand);
  await productRepository.updateProduct(product); 
  
  return product;
}



}
