import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/products.schema';
import {
  CreateProductDto,
  ProductResponseDto,
  UpdateProductDto,
} from './dto/product.dto';
import { validateObjectId } from 'src/utils/object-id.utils';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  async create(product: CreateProductDto): Promise<ProductResponseDto> {
    const createdProduct = this.productModel.create(product);
    return createdProduct;
  }

  async findAll(): Promise<ProductResponseDto[]> {
    return this.productModel.find().exec();
  }

  async findOne(id: string): Promise<ProductResponseDto> {
    validateObjectId(id);
    const result = await this.productModel.findById(id).exec();
    if (!result) {
      throw new HttpException("Product doesn't exist", HttpStatus.NOT_FOUND);
    }

    return result;
  }

  async update(id: string, product: UpdateProductDto): Promise<any> {
    validateObjectId(id);
    return this.productModel
      .findByIdAndUpdate(id, product, { new: true })
      .exec();
  }

  async delete(id: string): Promise<any> {
    validateObjectId(id);
    return this.productModel.findByIdAndDelete(id).exec();
  }
}
