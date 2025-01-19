export class Product {
    constructor(
      private props: {
        id?: string;
        name: string;
        description: string;
        price: number;
        stock: number;
        createdAt?: Date;
        updatedAt?: Date;
      }
    ) {
      this.props.createdAt = props.createdAt ?? new Date();
      this.props.updatedAt = props.updatedAt ?? new Date();
    }
  
    get id(): string | undefined {
      return this.props.id;
    }
  
    get name(): string {
      return this.props.name;
    }
  
    get description(): string {
      return this.props.description;
    }
  
    get price(): number {
      return this.props.price;
    }
  
    get stock(): number {
      return this.props.stock;
    }
  
    get createdAt(): Date {
      return this.props.createdAt!;
    }
  
    get updatedAt(): Date {
      return this.props.updatedAt!;
    }
  
    updateStock(quantity: number): void {
      if (this.props.stock < quantity) {
        throw new Error('Insufficient stock');
      }
      this.props.stock -= quantity;
      this.props.updatedAt = new Date();
    }
  
    addStock(quantity: number): void {
      this.props.stock += quantity;
      this.props.updatedAt = new Date();
    }
  
    update(props: Partial<Product>): void {
      this.props = {
        ...this.props,
        ...props,
        updatedAt: new Date()
      };
    }
  
    toJSON() {
      return {
        id: this.id,
        name: this.name,
        description: this.description,
        price: this.price,
        stock: this.stock,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      };
    }
  }