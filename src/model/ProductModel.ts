import { PrismaClient } from "@prisma/client";
import { ProductDoesntExistsError } from "../infrastructure/domain/Product/ProductDoesNotExistError";
import { Product } from "../infrastructure/domain/Product/Product";
import { ProductRepository } from "../infrastructure/repositories/ProductRepository";
import { Decimal } from "@prisma/client/runtime";
import { SupplierRepository } from "../infrastructure/repositories/SupplierRepository";
import { sortBy } from 'lodash';

export class ProductModel {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async deleteProduct(productId: number) {
    const productRepository = new ProductRepository(this.prisma);
    const product = await productRepository.getProductById(productId);
    if (!product)
      throw new ProductDoesntExistsError("Product does not exists", {
        component: "deleteProduct",
        input: { productId },
      });

    const deleteProduct = productRepository.deleteProduct(product);
    const transactions = [deleteProduct];
    await this.prisma.$transaction(transactions);

    return product;
  }

  async createProduct(product: Product) {
    const productRepository = new ProductRepository(this.prisma);

    const createdProduct = productRepository.createProduct(product);
    if (!createdProduct)
      throw new ProductDoesntExistsError("Product could not be created", {
        component: "createProduct",
        input: { product },
      });

    return createdProduct;
  }

  async selectProduct(product: Product): Promise<Product | null> {
    if (!product.snapshot.id) throw new Error('Product id is needed for selectProduct');
    const productRepository = new ProductRepository(this.prisma);
    const supplierRepo = new SupplierRepository(this.prisma);
    const completeProduct = await productRepository.getProductById(product.snapshot.id);
    if (!completeProduct) throw new ProductDoesntExistsError("Product not found", {
      component: "selectProduct",
      input: { product },
    });
    const suppliers = await supplierRepo.getManySuppliersByProduct(completeProduct);
    const sortedSuppliers = sortBy(suppliers, ['availableStock']);
    completeProduct.setSuppliers(sortedSuppliers);
    
    return completeProduct;
  }

  async updateProduct(productId: number, newName: string, newPrice: Decimal, newBrand: string){
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

  async getProductsByName(name: string) {
    const productRepository = new ProductRepository(this.prisma);
    const products = await productRepository.getProductsByName(name);

    return products;
  }

  async getAllProducts() {
    const productRepository = new ProductRepository(this.prisma);
    const products = await productRepository.getAllProducts();

    return products;
  }
}
