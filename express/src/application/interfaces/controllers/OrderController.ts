import { Request, Response } from "express";
import { OrderRepository } from "../../../domain/interfaces/repositories/OrderRepository";
import { ProductRepository } from "../../../domain/interfaces/repositories/ProductRepository";
import { CreateOrderUseCase } from "../../useCases/order/CreateOrder.useCase";
import { ListOrdersUseCase } from "../../useCases/order/ListOrders.useCase";
import { UpdateOrderUseCase } from "../../useCases/order/UpdateOrder.useCase";
import { DeleteOrderUseCase } from "../../useCases/order/DeleteOrder.useCase";
import { GetOrderByIdUseCase } from "../../useCases/order/GetOrderById.useCase";
import { CreateOrderDTO } from "../../../domain/dtos/order";

export class OrderController {
  private createOrderUseCase: CreateOrderUseCase;
  private listOrdersUseCase: ListOrdersUseCase;
  private updateOrderUseCase: UpdateOrderUseCase;
  private deleteOrderUseCase: DeleteOrderUseCase;
  private getOrderByIdUseCase: GetOrderByIdUseCase;

  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository
  ) {
    this.createOrderUseCase = new CreateOrderUseCase(
      orderRepository,
      productRepository
    );
    this.listOrdersUseCase = new ListOrdersUseCase(orderRepository);
    this.updateOrderUseCase = new UpdateOrderUseCase(orderRepository);
    this.deleteOrderUseCase = new DeleteOrderUseCase(orderRepository);
    this.getOrderByIdUseCase = new GetOrderByIdUseCase(orderRepository);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const orderData: CreateOrderDTO = req.body;
      const order = await this.createOrderUseCase.execute(orderData);
      return res.status(201).json(order);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const orders = await this.listOrdersUseCase.execute();
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const order = await this.getOrderByIdUseCase.execute(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const orderData = req.body;
      const updatedOrder = await this.updateOrderUseCase.execute(id, orderData);
      if (!updatedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }
      return res.status(200).json(updatedOrder);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.deleteOrderUseCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
