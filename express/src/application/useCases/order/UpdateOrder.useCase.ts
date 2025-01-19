import { UpdateOrderDTO } from "../../../domain/dtos/order";
import { Order } from "../../../domain/entities/Order";
import { OrderRepository } from "../../../domain/interfaces/repositories/OrderRepository";

export class UpdateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(id: string, data: UpdateOrderDTO): Promise<Order | null> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new Error("Order not found");
    }

    const updatedOrder = await this.orderRepository.update(id, data);

    return updatedOrder;
  }
}
