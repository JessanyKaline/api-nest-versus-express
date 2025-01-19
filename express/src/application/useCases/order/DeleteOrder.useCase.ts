import { OrderRepository } from "../../../domain/interfaces/repositories/OrderRepository";

export class DeleteOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(orderId: string): Promise<void> {
    const order = await this.orderRepository.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    await this.orderRepository.delete(orderId);
  }
}
