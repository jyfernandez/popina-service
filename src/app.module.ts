import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './modules/dish/model/dish.model';
import { DishModule } from './modules/dish/dish.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/popina',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Dish],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    DishModule,
  ],
})
export class AppModule {}
