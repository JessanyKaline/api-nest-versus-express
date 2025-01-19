import { Order } from "../../../domain/entities/Order";
import { OrderRepository } from "../../../domain/interfaces/repositories/OrderRepository";

export class GetOrderByIdUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(orderId: string): Promise<Order | null> {
    if (!orderId) {
      throw new Error("Order ID is required");
    }

    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }
}
