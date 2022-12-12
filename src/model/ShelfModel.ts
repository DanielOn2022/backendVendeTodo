import { PrismaClient } from "@prisma/client";
import { Product } from "../infrastructure/domain/Product/Product";
import { EmployeeRepository } from "../infrastructure/repositories/EmployeeRepository";
import { ProductRepository } from "../infrastructure/repositories/ProductRepository";
import { SaleLineRepository } from "../infrastructure/repositories/SaleLineRepository";
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
    const shelfsPayload = []
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

}