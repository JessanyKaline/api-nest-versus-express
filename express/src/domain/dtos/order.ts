interface ProductInfoDTO {
    id_product: string;
    qnt_of_purchase: number;
  }
  
  export class CreateOrderDTO {
    name_client: string;
    info_products: ProductInfoDTO[];
  }

  export class UpdateOrderDTO {
    name_client: string;
    info_products: ProductInfoDTO[];
  }