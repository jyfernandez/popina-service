import { Test, TestingModule } from '@nestjs/testing';
import { DishRepository } from '../dish/dish.repository';
import { DishService } from '../dish/dish.service';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

const mockOrderRepository = () => ({
  getOrderById: jest.fn(),
  find: jest.fn(),
  createOrder: jest.fn(),
  updateOrder: jest.fn(),
  deleteOrder: jest.fn(),
});
const mockDishRepository = () => ({
  getDishById: jest.fn(),
});
const mockDishService = () => ({
  getDish: jest.fn(),
});

describe('OrderService', () => {
  let orderService: OrderService;
  let orderRepository;
  let dishService;
  let dishRepository;

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
    dishService = module.get<DishService>(DishService);
    dishRepository = module.get<DishRepository>(DishRepository);
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
  describe('createOrder', () => {
    it('calls orderRepository.createOrder and returns the result', async () => {
      const orderMockValue = {
        id: '1234567890',
        dish: ['12345678'],
        total: 1,
        remarks: 'Nice',
      };
      const dishMockValue = {
        id: '1234567890',
        name: 'Spag',
        price: 1,
      };
      orderRepository.createOrder.mockResolvedValue(orderMockValue);
      dishRepository.getDishById.mockResolvedValue(dishMockValue);
      dishService.getDish.mockResolvedValue(dishMockValue);
      const result = await orderService.createOrder({
        dishIds: ['1234567890'],
        remarks: 'Nice',
      });
      expect(result).toEqual(orderMockValue);
    });
  });
  describe('updateOrder', () => {
    it('calls orderRepository.updateOrder and returns the result', async () => {
      const orderMockValue = {
        id: '1234567890',
        dish: ['12345678'],
        total: 1,
        remarks: 'Nice',
      };
      const dishMockValue = {
        id: '1234567890',
        name: 'Spag',
        price: 1,
      };
      orderRepository.updateOrder.mockResolvedValue(orderMockValue);
      dishRepository.getDishById.mockResolvedValue(dishMockValue);
      dishService.getDish.mockResolvedValue(dishMockValue);
      const result = await orderService.updateOrder({
        id: '1234567890',
        dishIds: ['1234567890'],
        remarks: 'Nice',
      });
      expect(result).toEqual(orderMockValue);
    });
  });
  describe('deleteOrder', () => {
    it('calls orderRepository.deleteOrder and returns the result', async () => {
      const mockValue = {
        id: '1234567890',
        dish: ['12345678'],
        total: 1,
        remarks: 'Nice',
      };
      orderRepository.deleteOrder.mockResolvedValue(mockValue);
      const result = await orderService.deleteOrder('1234567890');
      expect(result).toEqual(mockValue);
    });
  });
});
