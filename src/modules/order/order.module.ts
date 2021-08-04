import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './model/order.model';
import { OrderRepository } from './order.repository';
import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderRepository])],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}
