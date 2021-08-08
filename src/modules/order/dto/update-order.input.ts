import { Field, ID, InputType } from '@nestjs/graphql';
import { IsUUID, MinLength } from 'class-validator';

@InputType()
export class UpdatedOrderInput {
  @IsUUID('4', { each: true })
  @Field((type) => ID)
  id: string;

  @IsUUID('4', { each: true })
  @Field((type) => [ID])
  dishIds: string[];

  @MinLength(1)
  @Field()
  remarks: string;
}
