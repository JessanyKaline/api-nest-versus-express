interface ProductInfo {
  id_product: string;
  qnt_of_purchase: number;
}

  export class Order {
    id?: string;
    name_client: string;
    info_products: ProductInfo[];
    total_price: number;
    createdAt: Date;
    updatedAt: Date;
  
    constructor(props: Partial<Order>) {
      Object.assign(this, props);
      this.calculateTotal();
    }
  
    private calculateTotal() {
      this.total_price = this.info_products.reduce((acc, product) => {
        return acc + product.qnt_of_purchase;
      }, 0);
    }
  }