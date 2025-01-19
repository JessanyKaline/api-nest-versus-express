import { CreateProductDTO } from "../../../domain/dtos/product";
import { Product } from "../../../domain/entities/Product";
import { ProductRepository } from "../../../domain/interfaces/repositories/ProductRepository";

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: CreateProductDTO): Promise<Product> {
    const { name, price, description, stock } = request;

    if (!name || !price) {
      throw new Error("Name and price are required");
    }

    const product = new Product({
      name,
      price,
      description,
      stock
    });

    await this.productRepository.create(product);

    return product;
  }
}
