import { ProductRepository } from "../../../domain/interfaces/repositories/ProductRepository";

export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(productId: string): Promise<void> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new Error("Product not found");
    }

    await this.productRepository.delete(productId);
  }
}
