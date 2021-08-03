import { EntityRepository, Repository } from 'typeorm';
import { CreateDishInput } from './dto/create-dish.input';
import { Dish } from './model/dish.model';
import { v4 as uuid } from 'uuid';
import { UpdateDishInput } from './dto/update-dish.input';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Dish)
export class DishRepository extends Repository<Dish> {
  async getDishById(id: string): Promise<Dish> {
    const dish = await this.findOne({ id });
    if (!dish) {
      throw new NotFoundException('Dish does not exist.');
    }
    return dish;
  }

  async createDish(createDishInput: CreateDishInput): Promise<Dish> {
    const { name, description, isAvailable, price } = createDishInput;
    const dish = this.create({
      name,
      description,
      isAvailable,
      price,
      id: uuid(),
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    });
    return await this.save(dish);
  }

  async updateDish(updateDishInput: UpdateDishInput): Promise<Dish> {
    const { id, name, description, price } = updateDishInput;
    const dish = await this.getDishById(id);

    dish.name = name;
    dish.description = description;
    dish.price = price;
    dish.modifiedAt = new Date().toISOString();

    return await this.save(dish);
  }
}
