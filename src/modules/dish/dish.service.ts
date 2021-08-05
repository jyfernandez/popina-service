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
  public async getDishes(): Promise<Dish[]> {
    return await this.dishRepository.find();
  }
  public async getAvailableDishes(): Promise<Dish[]> {
    return await this.dishRepository.find({ isAvailable: true });
  }
  public async getDish(id: string): Promise<Dish> {
    return await this.dishRepository.getDishById(id);
  }

  public async createDish(createDishInput: CreateDishInput): Promise<Dish> {
    return await this.dishRepository.createDish(createDishInput);
  }
  public async updateDish(updateDishInput: UpdateDishInput): Promise<Dish> {
    return await this.dishRepository.updateDish(updateDishInput);
  }
  public async deleteDish(id: string): Promise<void> {
    return await this.dishRepository.deleteDish(id);
  }

  public async getManyDishes(dishIds: string[]): Promise<Dish[]> {
    return await this.dishRepository.getManyDishes(dishIds);
  }
}
