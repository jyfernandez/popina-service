import { EntityRepository, Repository } from 'typeorm';
import { CreateDishInput } from './dto/create-dish.input';
import { Dish } from './model/dish.model';
import { v4 as uuid } from 'uuid';

@EntityRepository(Dish)
export class DishRepository extends Repository<Dish> {
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
  async getDishById(id: string): Promise<Dish> {
    return await this.findOne({ id });
  }
}
