import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateDishInput } from './dto/create-dish.input';
import { DishService } from './dish.service';
import { Dish } from './model/dish.model';

@Resolver((of) => Dish)
export class DishResolver {
  constructor(private dishService: DishService) {}

  @Query((returns) => [Dish])
  dishes() {
    return this.dishService.getDishes();
  }

  @Query((returns) => Dish)
  dish(@Args('id') id: string) {
    return this.dishService.getDish(id);
  }

  @Mutation((returns) => Dish)
  createDish(@Args('createDishInput') createDishInput: CreateDishInput) {
    return this.dishService.createDish(createDishInput);
  }
}
