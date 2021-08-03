import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDishInput } from './dto/create-dish.input';
import { Dish } from './model/dish.model';
import { DishRepository } from './dish.repository';
import { UpdateDishInput } from './dto/update-dish.input';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(DishRepository)
    private dishRepository: DishRepository,
  ) {}
  async getDishes(): Promise<Dish[]> {
    return await this.dishRepository.find();
  }
  async getDish(id: string): Promise<Dish> {
    return await this.dishRepository.getDishById(id);
  }

  async createDish(createDishInput: CreateDishInput): Promise<Dish> {
    return await this.dishRepository.createDish(createDishInput);
  }
  async updateDish(updateDishInput: UpdateDishInput): Promise<Dish> {
    return await this.dishRepository.updateDish(updateDishInput);
  }
}
