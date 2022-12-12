import { arg, intArg, mutationType, stringArg } from "nexus";
import logger from "./Logger";
import { Product } from "./domain/Product/Product";
import { Decimal } from "@prisma/client/runtime";
import { ShopppingCartFactory } from "./factories/ShoppingCartFactory";
import { ProductFactory } from "./factories/ProductFactory";
import { isAuthenticated } from "./permissions";
import { Client } from "./domain/Client/Client";
import { SaleLineFactory } from "./factories/CartLineFactory";
import { PaymentMethodFactory } from "./factories/PaymentMethodFactory";
import { ShippingAddressFactory } from "./factories/ShippingAddressFactory";
import { ShippingAddress } from "./domain/ShippingAddress/ShippingAddress";

export const mutations = mutationType({
  definition(t) {
    t.field("createProduct", {
      type: 'product',
      args: {
        name: stringArg({ required: true }),
        price: intArg({ required: true }),
        brand: stringArg({ required: true }),
        stock: intArg({ required: true }),
        imageUrl: stringArg({ required: true }),
        volume: intArg({ required: true }),
        description: stringArg({ required: true }),
      },
      async resolve(_root, args, ctx) {
        const { name, price, brand, imageUrl, stock, description, volume } = args;
        return await ctx.productModel.createProduct(
          new Product({ name, brand, price: price as unknown as Decimal, imageUrl, stock, description, volume: volume as unknown as Decimal })
        );
      },
    });

    t.field("deleteProduct", {
      type: "product",
      args: { id: intArg({ required: true }) },
      async resolve(_root, args, ctx) {
        const { id } = args;
        try {
          return await ctx.productModel.deleteProduct(id);
        } catch (error: any) {
          logger.error(
            `An error ocurrred on deleteProduct mutation: ${error.message}`
          );
          return error;
        }
      },
    });

    t.field('updateProduct', {
      type: 'product',
      args: {
        id: intArg({required: true}),
        newName: stringArg({required: true}),
        newPrice: intArg({required: true}),
        newBrand: stringArg({required: true})
      },
      async resolve(_root, args, ctx) {
        const { id,newName,newPrice,newBrand } = args;
        
        try {
          return await ctx.productModel.updateProduct(id,newName,newPrice as unknown as Decimal,newBrand); 
        } catch (error: any) {
          logger.error(`An error ocurrred on updateProduct mutation: ${error.message}`);
          return error;
        }
      }
    });

    t.field('login', {
      type: 'User',
      args: {
        email: stringArg({required: true}),
        password: stringArg({required: true})
      }, 
      async resolve(_root, args, ctx) {
        const { email, password } = args;
        
        try {
          const client: Client = await ctx.authModel.login(email, password); 
          return client;
        } catch (error: any) {
          logger.error(`An error ocurrred on login mutation: ${error.message}`);
          return error;
        }
      }
    });

    t.field('loginEmployee', {
      type: 'Employee',
      args: {
        email: stringArg({required: true}),
        password: stringArg({required: true})
      }, 
      async resolve(_root, args, ctx) {
        const { email, password } = args;
        
        try {
          const employee = await ctx.authModel.loginEmployee(email, password); 
          return employee;
        } catch (error: any) {
          logger.error(`An error ocurrred on loginEmployee mutation: ${error.message}`);
          return error;
        }
      }
    });

    t.field('register', {
      type: 'User',
      args: {
        email: stringArg({required: true}),
        password: stringArg({required: true}),
        cellphone: stringArg({required: false}),
        name: stringArg({required: true}),
        lastname: stringArg({required: false}),
      }, 
      async resolve(_root, args, ctx) {
        const { email, password, name, cellphone, lastname } = args;
        
        try {
          return await ctx.authModel.register({email, name, password, cellphone, lastname}); 
        } catch (error: any) {
          logger.error(`An error ocurrred on register mutation: ${error.message}`);
          return error;
        }
      }
    });

    t.field('addToCart', {
      type: 'ShoppingCart',
      args: {
        quantity: intArg({required: true}),
        supplierId: intArg({required: true}),
        product: arg({ type: 'Product', required: true }),
        cart: arg({type: 'ShopppingCart', required: true})
      }, 
      authorize: (_root, _args, ctx) => {
        return isAuthenticated(ctx);
      },
      async resolve(_root, args, ctx) {
        const { cart, product, quantity, supplierId } = args;
        const shoppingCart = ShopppingCartFactory.createFromNexus(cart);
        const productObj = ProductFactory.createFromNexus(product);
        try {
          const cart = await ctx.cartModel.addToCart({cart: shoppingCart, product: productObj, quantity, supplierId});
          return cart;
        } catch (error: any) {
          logger.error(`An error ocurrred on addToCart mutation: ${error.message}`);
          return error;
        }
      }
    });

    t.field('startPayment', {
      type: 'StartPaymentPayload',
      args: {
        cart: arg({type: 'ShopppingCart', required: true})
      }, 
      authorize: (_root, _args, ctx) => {
        return isAuthenticated(ctx);
      },
      async resolve(_root, args, ctx) {
        const { cart } = args;
        const shoppingCart = ShopppingCartFactory.createFromNexus(cart);
        
        try {
          const cart = await ctx.saleModel.startPayment(shoppingCart);
          return cart;
        } catch (error: any) {
          logger.error(`An error ocurrred on startPayment mutation: ${error.message}`);
          return error;
        }
      }
    });

    t.field('cancelStartPayment', {
      type: 'Boolean',
      args: {
        availableLines: arg({type: 'SaleLineIn', required: true, list: true})
      }, 
      authorize: (_root, _args, ctx) => {
        return isAuthenticated(ctx);
      },
      async resolve(_root, args, ctx) {
        const { availableLines } = args;
        const saleLines = SaleLineFactory.createManyFromNexus(availableLines);
        try {
          await ctx.saleModel.cancelStartPayment(saleLines);
          return true;
        } catch (error: any) {
          logger.error(`An error ocurrred on cancelStartPayment mutation: ${error.message}`);
          return error;
        }
      }
    });

    t.field('createPaymentMethod', {
      type: 'PaymentMethod',
      args: {
        cardNumber: stringArg({required: true}),
        clientId: intArg({required: true}),
      }, 
      authorize: (_root, _args, ctx) => {
        return isAuthenticated(ctx);
      },
      async resolve(_root, args, ctx) {
        const { cardNumber, clientId } = args;
        try {
          const paymentMethod = await ctx.paymentMethodModel.createPaymentMethod(cardNumber, clientId);
          return paymentMethod;
        } catch (error: any) {
          logger.error(`An error ocurrred on createPaymentMethod mutation: ${error.message}`);
          return error;
        }
      }
    });

    t.field('createShippingAddress', {
      type: 'ShippingAddress',
      args: {
        city: stringArg({required: true}),
        street: stringArg({required: true}),
        externalNumber: stringArg({required: true}),
        internalNumber: stringArg({required: false}),
        clientId: intArg({required: true}),
      }, 
      authorize: (_root, _args, ctx) => {
        return isAuthenticated(ctx);
      },
      async resolve(_root, args, ctx) {
        const { city, clientId, externalNumber, street, internalNumber } = args;
        try {
          const shippingAddress = await ctx.shippingAddressModel.createShippingAddress(city, street, externalNumber, internalNumber || '', clientId);
          return shippingAddress;
        } catch (error: any) {
          logger.error(`An error ocurrred on createShippingAddress mutation: ${error.message}`);
          return error;
        }
      }
    });

    t.field('removeLineCart', {
      type: 'ShoppingCart',
      args: {
        shoppingCart: arg({ type: 'ShopppingCart', required: true}),
        saleLineId: intArg({required: true}),
      }, 
      authorize: (_root, _args, ctx) => {
        return isAuthenticated(ctx);
      },
      async resolve(_root, args, ctx) {
        const { shoppingCart, saleLineId } = args;
        try {
          const shoppingCartObj = ShopppingCartFactory.createFromNexus(shoppingCart);
          const shoppingCartUpdated = await ctx.cartModel.removeLineFromCart(shoppingCartObj, saleLineId);
          return shoppingCartUpdated;
        } catch (error: any) {
          logger.error(`An error ocurrred on removeLineCart mutation: ${error.message}`);
          return error;
        }
      }
    });
    
    t.field('authorizePayment', {
      type: 'PurchasePayload',
      args: {
        paymentMethod: arg({type: 'PaymentMethodIn', required: true}),
        shoppingCart: arg({type: 'ShopppingCart', required: true}),
        shippingAddress: arg({type: 'ShippingAddressIn', required: true}),
      }, 
      authorize: (_root, _args, ctx) => {
        return isAuthenticated(ctx);
      },
      async resolve(_root, args, ctx) {
        const { paymentMethod, shippingAddress, shoppingCart } = args;
        const shoppingCartObj = ShopppingCartFactory.createFromNexus(shoppingCart);
        const paymentMethodObj = PaymentMethodFactory.createFromNexus(paymentMethod);
        const shippingAddressObj = ShippingAddressFactory.createFromNexus(shippingAddress);
        try {
          const payload = await ctx.paymentModel.authorizePayment(paymentMethodObj, shoppingCartObj, shippingAddressObj);
          return payload;
        } catch (error: any) {
          logger.error(`An error ocurrred on authorizePayment mutation: ${error.message}`);
          return error;
        }
      }
    });

    t.field('registerEmployee', {
      type: 'Employee',
      args: {
        email: stringArg({required: true}),
        password: stringArg({required: true}),
        rfc: stringArg({required: true}),
        name: stringArg({required: true}),
        lastname: stringArg({required: false}),
      }, 
      async resolve(_root, args, ctx) {
        const { email, password, name, rfc, lastname } = args;
        
        try {
          return await ctx.authModel.registerEmployee({email, name, password, rfc, lastname}); 
        } catch (error: any) {
          logger.error(`An error ocurrred on registerEmployee mutation: ${error.message}`);
          return error;
        }
      }
    });

    t.field('sortShelfs', {
      type: 'SortedPayload',
      args: {
        shelfIds: intArg({required: true, list: true}),
      }, 
      list: true,
      authorize: (_root, _args, ctx) => {
        return isAuthenticated(ctx);
      },
      async resolve(_root, args, ctx) {
        const { shelfIds } = args;
        try {
          const payload = await ctx.shelfModel.sortShelfs(shelfIds); 
          return payload;
        } catch (error: any) {
          logger.error(`An error ocurrred on sortShelfs mutation: ${error.message}`);
          return error;
        }
      }
    });

    t.field('finishSortingProcess', {
      type: 'Boolean',
      args: {
        sortOrder: arg({type: 'SortOrder', required: true, list: true}),
        newStoredProducts: intArg({required: false, list: true}),
        newUnStoredProducts: intArg({required: false, list: true})
      }, 
      list: true,
      authorize: (_root, _args, ctx) => {
        return isAuthenticated(ctx);
      },
      async resolve(_root, args, ctx) {
        let { sortOrder, newStoredProducts, newUnStoredProducts } = args;
        try {
          const response = await ctx.shelfModel.finishSortingProcess(sortOrder, newStoredProducts, newUnStoredProducts); 
          return response;
        } catch (error: any) {
          logger.error(`An error ocurrred on finishSortingProcess mutation: ${error.message}`);
          return error;
        }
      }
    });

    t.field('begginSupply', {
      type: 'Boolean',
      args: {
        sortOrder: arg({type: 'SortOrder', required: true, list: true}),
        newStoredProducts: intArg({required: false, list: true}),
        newUnStoredProducts: intArg({required: false, list: true})
      }, 
      list: true,
      authorize: (_root, _args, ctx) => {
        return isAuthenticated(ctx);
      },
      async resolve(_root, args, ctx) {
        let { sortOrder, newStoredProducts, newUnStoredProducts } = args;
        try {
          const response = await ctx.shelfModel.finishSortingProcess(sortOrder, newStoredProducts, newUnStoredProducts); 
          return response;
        } catch (error: any) {
          logger.error(`An error ocurrred on begginSupply mutation: ${error.message}`);
          return error;
        }
      }
    });
  }
});
