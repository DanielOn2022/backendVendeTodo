import { PrismaClient } from "@prisma/client";
import { Product } from "../infrastructure/domain/Product/Product";
import { BatchRepository } from "../infrastructure/repositories/BatchRepository";
import { EmployeeRepository } from "../infrastructure/repositories/EmployeeRepository";
import { ProductRepository } from "../infrastructure/repositories/ProductRepository";
import { SaleLineRepository } from "../infrastructure/repositories/SaleLineRepository";
import { SectionRepository } from "../infrastructure/repositories/SectionRepository";
import { ShelfRepository } from "../infrastructure/repositories/ShelfRepository";
import { removeCommon } from "../utils/helpers";

export class ShelfModel {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  
  async BeginSortingProcess(managerId: number, role: string) {
    const employeeRepo = new EmployeeRepository(this.prisma);
    const shelfRepo = new ShelfRepository(this.prisma);
    const roleInfo = await employeeRepo.getRoleInfo(role, managerId);
    if (!roleInfo) throw new Error('Somenthing went wrong getting the role info');
    const shelfs = await shelfRepo.getShelfsByManager(roleInfo.roleId);
    if (!shelfs) throw new Error('Something went wrong getting shelfs');
    return shelfs
  }

  async sortShelfs(shelfIds: number[]) {
    const shelfRepo = new ShelfRepository(this.prisma);
    const productRepo = new ProductRepository(this.prisma);
    const saleLineRepo = new SaleLineRepository(this.prisma);
    const shelfsPayload = [];
    for (const shelfId of shelfIds) {
      const shelf = await shelfRepo.getShelfById(shelfId); 
      if (!shelf) continue;
      
      let unStoredProduct = await productRepo.getProductsInStoreHouse();
      let productsFromShelf = shelf?.getProducts();
      if (!unStoredProduct) unStoredProduct = [];
      if (!productsFromShelf) productsFromShelf = [];
      const productsToCompare = [...unStoredProduct, ...productsFromShelf];
      
      const topProductsId = await saleLineRepo.getTopNProducts(productsToCompare, shelf.snapshot.sections?.length);
      const topProducts: Product[] | null = [];
      topProductsId.forEach(productId => {
        topProducts.push(productsToCompare.find(product => product.snapshot.id === productId.product_id) as Product);
      });
      
      shelf.setNewOrder(topProducts);
      shelfRepo.updateSortedDate(shelf);
      const newStoredProducts = shelf.calculateProductsOnShelf(unStoredProduct);
      const newUnStoredProducts = shelf.calculateProductsOnShelf(productsFromShelf);

      shelfsPayload.push({
        shelf, 
        newStoredProducts,
        newUnStoredProducts: removeCommon(newUnStoredProducts, productsFromShelf)
      });
    }
    return shelfsPayload;
  }

  async finishSortingProcess(
    sortOrder: {
      sectionNumber: number, 
      shelfId: number, 
      productId: number 
    }[], 
    newStoredProducts?: (number | null)[] | null, 
    newUnStoredProducts?: (number | null)[] | null
  ) {
    const sectionRepo = new SectionRepository(this.prisma);
    const batchRepo = new BatchRepository(this.prisma);
    for (const sectionIds of sortOrder) {
      const section = await sectionRepo.updateSectionWithProduct(sectionIds.sectionNumber, sectionIds.shelfId, sectionIds.productId);
      if (!section) throw new Error('somenthing went wrong updating the section');
      const produtToShelf = newStoredProducts?.find(productId => sectionIds.productId === productId);
      if (produtToShelf) await batchRepo.setOnShelfProduct(sectionIds.productId, section.snapshot.capacity / (section.snapshot.product.snapshot.volume as unknown as number));
    }
    if (newUnStoredProducts) await batchRepo.setOutOfShelfProducts(newUnStoredProducts as number[]);
    return true;
  }

}