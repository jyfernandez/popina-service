import { Test, TestingModule } from '@nestjs/testing';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

const mockOrderRepository = () => ({
  getOrders: jest.fn(),
});
describe('OrderService', () => {
  let orderService: OrderService;
  let orderRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: OrderRepository,
          useFactory: mockOrderRepository,
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
      orderRepository.getOrders.mockResolvedValue(mockValue);
      const result = await orderService.getOrders();
      expect(result).toEqual(mockValue);
    });
  });
});
