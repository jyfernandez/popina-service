import { EntityRepository, Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { Order } from './model/order.model';
import { v4 as uuid } from 'uuid';
@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async createOrder(
    createOrderInput: CreateOrderInput,
    total: number,
  ): Promise<Order> {
    const { dishIds, remarks } = createOrderInput;
    const order = this.create({
      dish: dishIds,
      remarks,
      total,
      id: uuid(),
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    });
    return await this.save(order);
  }
}
