import { Order } from '../../entities/Order';

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findAll(): Promise<Order[]>;
  update(id: string, order: Partial<Order>): Promise<Order | null>;
  delete(id: string): Promise<void>;
}