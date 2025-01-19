import { Request, Response } from "express";
import { ProductRepository } from "../../../domain/interfaces/repositories/ProductRepository";
import { UpdateProductDTO } from "../../../domain/dtos/product";
import { ProductNotFoundError } from "../../../domain/errors/ProductErrors";
import { CreateProductDTO } from "../../../domain/dtos/product";
import { CreateProductUseCase } from "../../useCases/product/CreateProduct.useCase";
import { ListProductsUseCase } from "../../useCases/product/ListProducts.useCase";
import { GetProductByIdUseCase } from "../../useCases/product/GetProductById.useCase";
import { UpdateProductUseCase } from "../../useCases/product/UpdateProduct.useCase";
import { DeleteProductUseCase } from "../../useCases/product/DeleteProduct.useCase";

export class ProductController {
  private createProductUseCase: CreateProductUseCase;
  private listProductsUseCase: ListProductsUseCase;
  private getProductByIdUseCase: GetProductByIdUseCase;
  private updateProductUseCase: UpdateProductUseCase;
  private deleteProductUseCase: DeleteProductUseCase;

  constructor(private productRepository: ProductRepository) {
    this.createProductUseCase = new CreateProductUseCase(productRepository);
    this.listProductsUseCase = new ListProductsUseCase(productRepository);
    this.getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
    this.updateProductUseCase = new UpdateProductUseCase(productRepository);
    this.deleteProductUseCase = new DeleteProductUseCase(productRepository);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const productData: CreateProductDTO = req.body;

      if (
        !productData.name ||
        !productData.price ||
        productData.stock === undefined
      ) {
        return res.status(400).json({
          error: "Missing required fields: name, price, and stock are required",
        });
      }

      if (productData.price < 0 || productData.stock < 0) {
        return res.status(400).json({
          error: "Price and stock must be positive numbers",
        });
      }

      const product = await this.createProductUseCase.execute(productData);
      return res.status(201).json(product);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.listProductsUseCase.execute();
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      const product = await this.getProductByIdUseCase.execute(id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.json(product);
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const updateData: UpdateProductDTO = req.body;

      if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      if (updateData.price !== undefined && updateData.price < 0) {
        return res
          .status(400)
          .json({ error: "Price must be a positive number" });
      }

      if (updateData.stock !== undefined && updateData.stock < 0) {
        return res
          .status(400)
          .json({ error: "Stock must be a positive number" });
      }

      const updatedProduct = await this.updateProductUseCase.execute(
        id,
        updateData
      );

      if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.json(updatedProduct);
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        return res.status(404).json({ error: error.message });
      }
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      await this.deleteProductUseCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof ProductNotFoundError) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateStock(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
      }

      if (quantity === undefined) {
        return res.status(400).json({ error: "Quantity is required" });
      }

      const product = await this.productRepository.updateStock(id, quantity);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      return res.json(product);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
