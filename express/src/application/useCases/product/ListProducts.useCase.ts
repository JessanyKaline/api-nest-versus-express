import { Product } from "../../../domain/entities/Product";
import { ProductRepository } from "../../../domain/interfaces/repositories/ProductRepository";

export class ListProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    const products = await this.productRepository.findAll();
    return products;
  }
}
