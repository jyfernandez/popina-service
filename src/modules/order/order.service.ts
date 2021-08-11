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
  public async getOrder(id: string): Promise<Order> {
    return await this.orderRepository.getOrderById(id);
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
  public async updateOrder(updateOrderInput: UpdateOrderInput): Promise<Order> {
    const { id, dishIds, remarks } = updateOrderInput;

    const order = await this.getOrder(id);
    const total = await this.getOrderTotal(dishIds);
    return await this.orderRepository.updateOrder(
      order,
      updateOrderInput,
      total,
    );
  }
  public async getOrderTotal(dishIds: string[]): Promise<number> {
    const dishes = [];
    for (let i = 0; i < dishIds.length; i++) {
      const dish = await this.dishService.getDish(dishIds[i]);
      dishes.push(dish);
    }
    const total = dishes.reduce((total, dish) => total + dish.price, 0);
    return total;
  }
  public async deleteOrder(id: string): Promise<void> {
    return await this.orderRepository.deleteOrder(id);
  }
}
