import { Product } from "../../../domain/entities/Product";
import { ProductRepository } from "../../../domain/interfaces/repositories/ProductRepository";

export class GetProductByIdUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string): Promise<Product | null> {
    const product = await this.productRepository.findById(id);
    return product;
  }
}
