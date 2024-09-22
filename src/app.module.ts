import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { VendorsModule } from './vendors/vendors.module';
import { VariantsModule } from './variants/variants.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CSVService } from './common/services/csv.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/test-db'),
    ProductsModule,
    ManufacturersModule,
    VendorsModule,
    VariantsModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService, CSVService],
})
export class AppModule {}
