import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Dish')
export class DishType {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  isAvailable: boolean;

  @Field()
  price: number;

  @Field()
  createdAt: string;

  @Field()
  modifiedAt: string;
}
