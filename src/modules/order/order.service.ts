import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DishService } from '../dish/dish.service';
import { CreateOrderInput } from './dto/create-order.input';
import { Order } from './model/order.model';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
    private dishService: DishService,
  ) {}
  public async getOrders(): Promise<Order[]> {
    return await this.orderRepository.find();
  }
  public async createOrder(createOrderInput: CreateOrderInput): Promise<Order> {
    const { dishIds, remarks } = createOrderInput;
    const dishes = [];

    for (let i = 0; i < dishIds.length; i++) {
      const dish = await this.dishService.getDish(dishIds[i]);
      dishes.push(dish);
    }
    const total = dishes.reduce((total, dish) => total + dish.price, 0);
    return await this.orderRepository.createOrder(createOrderInput, total);
  }
}
