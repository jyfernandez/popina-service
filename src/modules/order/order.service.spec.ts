import { Test, TestingModule } from '@nestjs/testing';
import { DishRepository } from '../dish/dish.repository';
import { DishService } from '../dish/dish.service';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

const mockOrderRepository = () => ({
  getOrderById: jest.fn(),
  find: jest.fn(),
});
const mockDishRepository = () => ({});
const mockDishService = () => ({});

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: DishService,
          useFactory: mockDishService,
        },
        {
          provide: OrderRepository,
          useFactory: mockOrderRepository,
        },
        {
          provide: DishRepository,
          useFactory: mockDishRepository,
        },
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    orderRepository = module.get<OrderRepository>(OrderRepository);
  });
  describe('getOrders', () => {
    it('calls orderRepository.getOrders and returns the result', async () => {
      const mockValue = [
        {
          id: '1234567890',
          dish: ['12345678'],
          total: 1,
          remarks: 'Nice',
        },
      ];
      orderRepository.find.mockResolvedValue(mockValue);
      const result = await orderService.getOrders();
      expect(result).toEqual(mockValue);
    });
  });
  describe('getOrder', () => {
    it('calls orderRepository.getOrder and returns the result', async () => {
      const mockValue = {
        id: '1234567890',
        dish: ['12345678'],
        total: 1,
        remarks: 'Nice',
      };
      orderRepository.getOrderById.mockResolvedValue(mockValue);
      const result = await orderService.getOrder('1234567890');
      expect(result).toEqual(mockValue);
    });
  });
});
