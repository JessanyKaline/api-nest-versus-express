export class InsufficientStockError extends Error {
    constructor(productName: string) {
      super(`Insufficient stock for product: ${productName}`);
      this.name = 'InsufficientStockError';
    }
  }
  
  export class ProductNotFoundError extends Error {
    constructor(productId: string) {
      super(`Product not found with id: ${productId}`);
      this.name = 'ProductNotFoundError';
    }
  }