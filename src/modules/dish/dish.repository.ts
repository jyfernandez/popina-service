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
      throw new NotFoundException(`Dish with ID ${id} not found`);
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
  async deleteDish(id: string): Promise<void> {
    const result = await this.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Dish with ID ${id} not found`);
    }
  }

  async getManyDishes(dishIds: string[]): Promise<Dish[]> {
    return await this.find({
      where: {
        id: {
          $in: dishIds,
        },
      },
    });
  }
}
