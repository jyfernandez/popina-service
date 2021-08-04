import { EntityRepository, Repository } from 'typeorm';
import { Order } from './model/order.model';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {}
