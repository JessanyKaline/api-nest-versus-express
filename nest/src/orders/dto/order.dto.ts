import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  name_client: string;

  @IsNotEmpty()
  info_products: ProductInfoDto[];
}

export class ProductInfoDto {
  @IsNotEmpty()
  @IsString()
  id_product: string;

  @IsNotEmpty()
  @IsNumber()
  qnt_of_purchase: number;
}

export class OrderResponseDto extends CreateOrderDto {
  date_of_purchase: Date;
  total_price: number;
}
