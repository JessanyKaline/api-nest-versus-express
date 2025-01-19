import { Order } from '../../../../domain/entities/Order';
import { OrderRepository } from '../../../../domain/interfaces/repositories/OrderRepository';
import { OrderModel } from '../models/OrderModel';

export class MongoOrderRepository implements OrderRepository {
  async create(order: Order): Promise<Order> {
    const orderModel = new OrderModel(order);
    const savedOrder = await orderModel.save();
    return this.mapToEntity(savedOrder);
  }

  async findById(id: string): Promise<Order | null> {
    const order = await OrderModel.findById(id);
    return order ? this.mapToEntity(order) : null;
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.find();
    return orders.map(order => this.mapToEntity(order));
  }

  private mapToEntity(data: any): Order {
    return new Order({
      id: data._id.toString(),
      name_client: data.name_client,
      info_products: data.info_products,
      total_price: data.total_price,
      createdAt: data.createdAt,
    });
  }

  async update(id: string, order: Partial<Order>): Promise<Order | null> {
    const updatedOrder = await OrderModel.findByIdAndUpdate(id, order, { new: true });
    return updatedOrder ? this.mapToEntity(updatedOrder) : null;
  }

  async delete(id: string): Promise<void> {
    await OrderModel.findByIdAndDelete(id);
  }
}