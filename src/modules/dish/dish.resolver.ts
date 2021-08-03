import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateDishInput } from './dto/create-dish.input';
import { DishService } from './dish.service';
import { Dish } from './model/dish.model';
import { UpdateDishInput } from './dto/update-dish.input';

@Resolver((of) => Dish)
export class DishResolver {
  constructor(private dishService: DishService) {}

  @Query((returns) => [Dish])
  async dishes() {
    return await this.dishService.getDishes();
  }

  @Query((returns) => Dish)
  async dish(@Args('id') id: string) {
    return await this.dishService.getDish(id);
  }

  @Mutation((returns) => Dish)
  async createDish(@Args('createDishInput') createDishInput: CreateDishInput) {
    return await this.dishService.createDish(createDishInput);
  }
  @Mutation((returns) => Dish)
  async updateDish(@Args('updateDishInput') updateDishInput: UpdateDishInput) {
    return await this.dishService.updateDish(updateDishInput);
  }
  @Mutation((returns) => ID)
  async deleteDish(@Args('id') id: string) {
    await this.dishService.deleteDish(id);
    return id;
  }
}
