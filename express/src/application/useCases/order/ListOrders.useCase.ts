import { Order } from "../../../domain/entities/Order";
import { OrderRepository } from "../../../domain/interfaces/repositories/OrderRepository";

export class ListOrdersUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(): Promise<Order[]> {
    const orders = await this.orderRepository.findAll();
    return orders;
  }
}
