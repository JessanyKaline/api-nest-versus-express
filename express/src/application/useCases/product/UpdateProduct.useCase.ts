import { UpdateProductDTO } from "../../../domain/dtos/product";
import { Product } from "../../../domain/entities/Product";
import { ProductRepository } from "../../../domain/interfaces/repositories/ProductRepository";

export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string, data: UpdateProductDTO): Promise<Product | null> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new Error("Product not found");
    }

    const updatedProduct = await this.productRepository.update(id, data);

    return updatedProduct;
  }
}
