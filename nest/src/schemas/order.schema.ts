import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ProductInfo {
  @Prop({ required: true })
  id_product: string;

  @Prop({ required: true, min: 0 })
  qnt_of_purchase: number;
}

const ProductInfoSchema = SchemaFactory.createForClass(ProductInfo);

@Schema()
export class Order {
  @Prop({ required: true })
  name_client: string;

  @Prop({ required: true })
  date_of_purchase: Date;

  @Prop({ required: true })
  total_price: number;

  @Prop({ type: [ProductInfoSchema], required: true })
  info_products: ProductInfo[];
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
