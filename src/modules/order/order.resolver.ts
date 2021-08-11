import { UseGuards } from '@nestjs/common';
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { DishService } from '../dish/dish.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdatedOrderInput } from './dto/update-order.input';
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
  @Mutation((returns) => Order)
  async updateOrder(
    @Args('updateOrderInput') updateOrderInput: UpdatedOrderInput,
  ) {
    return await this.orderService.updateOrder(updateOrderInput);
  }
  @UseGuards(AuthGuard)
  @Mutation((returns) => ID)
  async deleteOrder(@Args('id') id: string) {
    await this.orderService.deleteOrder(id);
    return id;
  }
  @ResolveField()
  async dish(@Parent() order: Order) {
    return this.dishService.getManyDishes(order.dish);
  }
}
