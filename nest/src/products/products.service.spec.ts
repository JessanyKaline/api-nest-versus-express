import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/mongoose';
import { Product } from '../schemas/products.schema';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let model: Model<Product>;

  const mockProduct = {
    name: 'Test Product',
    description: 'Test Description',
    price: 10,
    qnt_stock: 100,
  };

  const mockProductModel = {
    create: jest.fn().mockResolvedValue(mockProduct),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(Product.name),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    model = module.get<Model<Product>>(getModelToken(Product.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const createProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        price: 10,
        qnt_stock: 100,
      };

      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockProduct as any));

      const result = await service.create(createProductDto);
      expect(result).toEqual(mockProduct);
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const products = [mockProduct];
      mockProductModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(products),
      });

      const result = await service.findAll();
      expect(result).toEqual(products);
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const validId = '507f1f77bcf86cd799439011';
      mockProductModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockProduct),
      });

      const result = await service.findOne(validId);
      expect(result).toEqual(mockProduct);
    });

    it('should throw an error if product not found', async () => {
      const validId = '507f1f77bcf86cd799439011';
      mockProductModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findOne(validId)).rejects.toThrow(HttpException);
    });

    it('should throw an error if invalid id is provided', async () => {
      const invalidId = 'invalid-id';
      await expect(service.findOne(invalidId)).rejects.toThrow(
        'Invalid ID format',
      );
    });
  });
});
