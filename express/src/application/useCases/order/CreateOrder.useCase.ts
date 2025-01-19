import { CreateOrderDTO } from "../../../domain/dtos/order";
import { Order } from "../../../domain/entities/Order";
import { OrderRepository } from "../../../domain/interfaces/repositories/OrderRepository";
import { ProductRepository } from "../../../domain/interfaces/repositories/ProductRepository";

export class CreateOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository
  ) {}

  private async validateStock(data: CreateOrderDTO): Promise<void> {
    for (const item of data.info_products) {
      const product = await this.productRepository.findById(item.id_product);
      if (!product) {
        throw new Error(`Product with id ${item.id_product} not found`);
      }
      if (product.stock < item.qnt_of_purchase) {
        throw new Error(
          `Insufficient stock for product ${product.name}. Available: ${product.stock}, Requested: ${item.qnt_of_purchase}`
        );
      }
    }
  }

  async execute(data: CreateOrderDTO): Promise<Order> {
    try {
      await this.validateStock(data);

      const order = new Order({
        name_client: data.name_client,
        info_products: data.info_products,
      });

      return await this.orderRepository.create(order);
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }
}
