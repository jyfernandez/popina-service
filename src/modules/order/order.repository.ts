import { EntityRepository, Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { Order } from './model/order.model';
import { v4 as uuid } from 'uuid';
import { UpdatedOrderInput } from './dto/update-order.input';
import { NotFoundException } from '@nestjs/common';
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
  async updateOrder(
    order: Order,
    updateOrderInput: UpdatedOrderInput,
    total: number,
  ): Promise<Order> {
    const { dishIds, remarks } = updateOrderInput;
    order.dish = dishIds;
    order.total = total;
    order.remarks = remarks;
    order.modifiedAt = new Date().toISOString();
    return await this.save(order);
  }
  async getOrderById(id: string): Promise<Order> {
    return await this.findOne({ id });
  }
  async deleteOrder(id: string): Promise<void> {
    const result = await this.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
  }
}
