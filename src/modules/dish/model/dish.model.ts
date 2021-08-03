import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Dish {
  @ObjectIdColumn()
  _id: string;

  @Field((type) => ID)
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  isAvailable: boolean;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  createdAt: string;

  @Field()
  @Column()
  modifiedAt: string;
}
