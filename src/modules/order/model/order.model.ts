import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Dish } from 'src/modules/dish/model/dish.model';

@Entity()
@ObjectType()
export class Order {
  @ObjectIdColumn()
  _id: string;

  @Field((type) => ID)
  @PrimaryColumn()
  id: string;

  @Field((type) => [Dish])
  @Column()
  dish: string[];

  @Field()
  @Column()
  total: number;

  @Field()
  @Column()
  remarks: string;

  @Field()
  @Column()
  createdAt: string;

  @Field()
  @Column()
  modifiedAt: string;
}
