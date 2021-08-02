import { Module } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishResolver } from './dish.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './dish.entity';
import { DishRepository } from './dish.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Dish, DishRepository])],
  providers: [DishService, DishResolver],
})
export class DishModule {}
