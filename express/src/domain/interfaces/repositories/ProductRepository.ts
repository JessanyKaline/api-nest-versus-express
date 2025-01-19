import { Product } from '../../entities/Product';

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findByIds(ids: string[]): Promise<Product[]>;
  findAll(): Promise<Product[]>;
  update(id: string, product: Partial<Product>): Promise<Product | null>;
  delete(id: string): Promise<void>;
  updateStock(id: string, quantity: number): Promise<Product | null>;
}