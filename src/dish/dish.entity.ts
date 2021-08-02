import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Dish {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  isAvailable: boolean;

  @Column()
  price: number;

  @Column()
  createdAt: string;

  @Column()
  modifiedAt: string;
}
