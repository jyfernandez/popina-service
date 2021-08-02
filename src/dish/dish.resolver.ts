import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateDishInput } from './create-dish.input';
import { DishService } from './dish.service';
import { DishType } from './dish.type';

@Resolver((of) => DishType)
export class DishResolver {
  constructor(private dishService: DishService) {}

  @Query((returns) => [DishType])
  dishes() {
    return this.dishService.getDishes();
  }

  @Mutation((returns) => DishType)
  createDish(@Args('createDishInput') createDishInput: CreateDishInput) {
    return this.dishService.createDish(createDishInput);
  }
}
