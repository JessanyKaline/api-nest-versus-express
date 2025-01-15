import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { getModelToken } from '@nestjs/mongoose';
import { Order } from '../schemas/order.schema';
import { Product } from '../schemas/products.schema';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common';

describe('OrdersService', () => {
  let service: OrdersService;
  let orderModel: Model<Order>;
  let productModel: Model<Product>;

  const mockProducts = [
    {
      _id: { toString: () => '507f1f77bcf86cd799439011' },
      name: 'Test Product',
      price: 10,
      qnt_stock: 100,
    },
  ];

  const mockOrder = {
    name_client: 'Test Client',
    info_products: [
      {
        id_product: '507f1f77bcf86cd799439011',
        qnt_of_purchase: 2,
      },
    ],
    total_price: 20,
    date_of_purchase: new Date(),
  };

  const mockProductModel = {
    create: jest.fn(),
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockProducts),
    }),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  const mockOrderModel = {
    create: jest.fn().mockResolvedValue(mockOrder),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: getModelToken(Order.name),
          useValue: mockOrderModel,
        },
        {
          provide: getModelToken(Product.name),
          useValue: mockProductModel,
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    orderModel = module.get<Model<Order>>(getModelToken(Order.name));
    productModel = module.get<Model<Product>>(getModelToken(Product.name));
  });

  describe('create', () => {
    it('should create an order successfully', async () => {
      const createOrderDto = {
        name_client: 'Test Client',
        info_products: [
          {
            id_product: '507f1f77bcf86cd799439011',
            qnt_of_purchase: 2,
          },
        ],
      };

      mockProductModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockProducts),
      });
      const result = await service.create(createOrderDto);
      expect(result).toEqual(mockOrder);
    });
  });

  describe('stockValidation', () => {
    it('should validate stock successfully', async () => {
      const orderDto = {
        name_client: 'Test Client',
        info_products: [
          {
            id_product: '507f1f77bcf86cd799439011',
            qnt_of_purchase: 2,
          },
        ],
      };

      mockProductModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockProducts),
      });

      const result = await service.stockValidation(orderDto);
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBeTruthy();
    });

    it('should throw error when product not found', async () => {
      const orderDto = {
        name_client: 'Test Client',
        info_products: [
          {
            id_product: 'non-existent-id',
            qnt_of_purchase: 2,
          },
        ],
      };

      mockProductModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue([]),
      });

      await expect(service.stockValidation(orderDto)).rejects.toThrow(
        "Product doesn't exist",
      );
    });

    it('should throw error when insufficient stock', async () => {
      const orderDto = {
        name_client: 'Test Client',
        info_products: [
          {
            id_product: '507f1f77bcf86cd799439011',
            qnt_of_purchase: 20,
          },
        ],
      };

      mockProductModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue([
          {
            _id: { toString: () => '507f1f77bcf86cd799439011' },
            qnt_stock: 10,
          },
        ]),
      });

      await expect(service.stockValidation(orderDto)).rejects.toThrow(
        'Insufficient stock',
      );
    });
  });

  describe('updateStock', () => {
    it('should update stock successfully', async () => {
      const orderDto = {
        name_client: 'Test Client',
        info_products: [
          {
            id_product: '507f1f77bcf86cd799439011',
            qnt_of_purchase: 2,
          },
        ],
      };

      mockProductModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(true),
      });

      await service.updateStock(orderDto);
      expect(mockProductModel.findByIdAndUpdate).toHaveBeenCalledWith(
        '507f1f77bcf86cd799439011',
        { $inc: { qnt_stock: -2 } },
        { new: true },
      );
    });

    it('should handle multiple products update', async () => {
      const orderDto = {
        name_client: 'Test Client',
        info_products: [
          {
            id_product: '507f1f77bcf86cd799439011',
            qnt_of_purchase: 2,
          },
          {
            id_product: '507f1f77bcf86cd799439012',
            qnt_of_purchase: 3,
          },
        ],
      };

      mockProductModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue(true),
      });

      await service.updateStock(orderDto);
      expect(mockProductModel.findByIdAndUpdate).toHaveBeenCalledTimes(2);
    });
  });
});
