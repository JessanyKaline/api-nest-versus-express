import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/order.dto';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

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

  const mockOrdersService = {
    create: jest.fn().mockResolvedValue(mockOrder),
    findAll: jest.fn().mockResolvedValue([mockOrder]),
    findOne: jest.fn().mockResolvedValue(mockOrder),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: mockOrdersService,
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an order', async () => {
      const createOrderDto: CreateOrderDto = {
        name_client: 'Test Client',
        info_products: [
          {
            id_product: '507f1f77bcf86cd799439011',
            qnt_of_purchase: 2,
          },
        ],
      };

      const result = await controller.create(createOrderDto);
      expect(result).toEqual(mockOrder);
      expect(service.create).toHaveBeenCalledWith(createOrderDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockOrder]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single order', async () => {
      const id = '507f1f77bcf86cd799439011';
      const result = await controller.findOne(id);
      expect(result).toEqual(mockOrder);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });
});
