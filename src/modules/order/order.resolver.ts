import { Query, Resolver } from '@nestjs/graphql';
import { Order } from './model/order.model';
import { OrderService } from './order.service';

@Resolver((of) => Order)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Query((returns) => [Order])
  async orders() {
    return await this.orderService.getOrders();
  }
}
