import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsUUID, MinLength } from 'class-validator';

@InputType()
export class UpdateDishInput {
  @IsUUID()
  @Field()
  id: string;
  @MinLength(1)
  @Field()
  name: string;

  @MinLength(1)
  @Field()
  description: string;

  @IsNumber()
  @Field()
  price: number;
}
