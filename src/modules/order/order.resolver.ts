import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { DishService } from '../dish/dish.service';
import { CreateOrderInput } from './dto/create-order.input';
import { Order } from './model/order.model';
import { OrderService } from './order.service';

@Resolver((of) => Order)
export class OrderResolver {
  constructor(
    private orderService: OrderService,
    private dishService: DishService,
  ) {}

  @Query((returns) => [Order])
  async orders() {
    return await this.orderService.getOrders();
  }
  @Query((returns) => Order)
  async order(id: string) {
    return await this.orderService.getOrder(id);
  }

  @Mutation((returns) => Order)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    return await this.orderService.createOrder(createOrderInput);
  }
  @ResolveField()
  async dish(@Parent() order: Order) {
    return this.dishService.getManyDishes(order.dish);
  }
}
