import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, MinLength } from 'class-validator';

@InputType()
export class CreateDishInput {
  @MinLength(1)
  @Field()
  name: string;

  @MinLength(1)
  @Field()
  description: string;

  @IsBoolean()
  @Field()
  isAvailable: boolean;

  @IsNumber()
  @Field()
  price: number;
}
