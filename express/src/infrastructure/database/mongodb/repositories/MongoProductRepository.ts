import { Product } from "../../../../domain/entities/Product";
import { ProductRepository } from "../../../../domain/interfaces/repositories/ProductRepository";
import { ProductModel } from "../models/ProductModel";

export class MongoProductRepository implements ProductRepository {
  async create(product: Product): Promise<Product> {
    const productModel = new ProductModel(product.toJSON());
    const savedProduct = await productModel.save();
    return this.mapToEntity(savedProduct);
  }

  async findById(id: string): Promise<Product | null> {
    const product = await ProductModel.findById(id);
    return product ? this.mapToEntity(product) : null;
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    const products = await ProductModel.find({ _id: { $in: ids } });
    return products.map((product) => this.mapToEntity(product));
  }

  async findAll(): Promise<Product[]> {
    const products = await ProductModel.find();
    return products.map((product) => this.mapToEntity(product));
  }

  async update(
    id: string,
    productData: Partial<Product>
  ): Promise<Product | null> {
    const product = await ProductModel.findByIdAndUpdate(
      id,
      { ...productData, updatedAt: new Date() },
      { new: true }
    );
    return product ? this.mapToEntity(product) : null;
  }

  async delete(id: string): Promise<void> {
    await ProductModel.findByIdAndDelete(id);
  }

  async updateStock(id: string, quantity: number): Promise<Product | null> {
    const product = await ProductModel.findByIdAndUpdate(
      id,
      {
        $inc: { stock: -quantity },
        updatedAt: new Date(),
      },
      { new: true }
    );
    return product ? this.mapToEntity(product) : null;
  }

  private mapToEntity(data: any): Product {
    return new Product({
      id: data._id.toString(),
      name: data.name,
      description: data.description,
      price: data.price,
      stock: data.stock,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }
}
