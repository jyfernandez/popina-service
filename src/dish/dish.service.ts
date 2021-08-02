import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDishInput } from './create-dish.input';
import { Dish } from './dish.entity';
import { DishRepository } from './dish.repository';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(DishRepository)
    private dishRepository: DishRepository,
  ) {}
  async getDishes(): Promise<Dish[]> {
    return await this.dishRepository.find();
  }

  async createDish(createDishInput: CreateDishInput): Promise<Dish> {
    return await this.dishRepository.createDish(createDishInput);
  }
}
