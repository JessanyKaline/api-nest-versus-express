import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:example@localhost:27017'),
    ProductsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
