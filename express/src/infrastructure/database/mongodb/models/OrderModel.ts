import { Schema, model, Document } from "mongoose";

interface ProductInfo {
  id_product: string;
  qnt_of_purchase: number;
}

const ProductInfoSchema = new Schema<ProductInfo>({
  id_product: { type: String, required: true },
  qnt_of_purchase: { type: Number, required: true, min: 0 },
});

interface Order extends Document {
  name_client: string;
  date_of_purchase: Date;
  total_price: number;
  info_products: ProductInfo[];
}

const OrderSchema = new Schema<Order>({
  name_client: { type: String, required: true },
  date_of_purchase: { type: Date, default: Date.now },
  total_price: { type: Number, required: true },
  info_products: { type: [ProductInfoSchema], required: true },
});

const OrderModel = model<Order>("Order", OrderSchema);

export { OrderModel, Order, ProductInfo };
