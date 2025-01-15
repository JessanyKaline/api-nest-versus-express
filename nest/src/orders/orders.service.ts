import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schemas/order.schema';
import { Product } from 'src/schemas/products.schema';
import { CreateOrderDto, OrderResponseDto } from './dto/order.dto';
import { validateObjectId } from 'src/utils/object-id.utils';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(order: CreateOrderDto): Promise<OrderResponseDto> {
    const infoProductsInStock = await this.stockValidation(order);

    if (infoProductsInStock) {
      const priceTotal = this.calculateTotalPrice(order, infoProductsInStock);

      const orderToSave = {
        ...order,
        total_price: priceTotal,
        date_of_purchase: new Date(),
      };

      await this.updateStock(order);

      const createdOrder = this.orderModel.create(orderToSave);
      return createdOrder;
    }
  }

  async updateStock(order: CreateOrderDto): Promise<void> {
    order.info_products.forEach(async (product) => {
      await this.productModel.findByIdAndUpdate(
        product.id_product,
        {
          $inc: { qnt_stock: -product.qnt_of_purchase },
        },
        { new: true },
      );
    });
  }

  async stockValidation(order: CreateOrderDto): Promise<any> {
    const ids = order.info_products.map((product) => product.id_product);
    const dbProducts = await this.productModel.find({
      _id: { $in: ids },
    });

    for (const product of order.info_products) {
      const dbProductOfPurchase = dbProducts.find(
        (matchProduct) => matchProduct._id.toString() === product.id_product,
      );

      if (!dbProductOfPurchase) {
        throw new HttpException("Product doesn't exist", HttpStatus.NOT_FOUND);
      }

      if (dbProductOfPurchase.qnt_stock < product.qnt_of_purchase) {
        throw new HttpException('Insufficient stock', HttpStatus.CONFLICT);
      }
    }
    return dbProducts;
  }

  calculateTotalPrice(order: CreateOrderDto, infoProductsInStock: any): number {
    let priceTotal = 0;
    order.info_products.forEach((product) => {
      const dbProductOfPurchase = infoProductsInStock.find(
        (matchProduct) => matchProduct._id.toString() === product.id_product,
      );
      priceTotal += dbProductOfPurchase.price * product.qnt_of_purchase;
    });
    return priceTotal;
  }

  async findAll(): Promise<OrderResponseDto[]> {
    return this.orderModel.find().exec();
  }

  async findOne(id: string): Promise<OrderResponseDto> {
    validateObjectId(id);
    return await this.orderModel.findById(id).exec();
  }
}
