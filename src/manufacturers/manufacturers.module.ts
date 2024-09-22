import { Module } from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';
import { ManufacturersController } from './manufacturers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Manufacturer, ManufacturerSchema } from './schemas/manufacturer.schema';
import { Product, ProductSchema } from 'src/products/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Manufacturer.name, schema: ManufacturerSchema}]), 
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  controllers: [ManufacturersController],
  providers: [ManufacturersService],
  exports: [ManufacturersService]
})
export class ManufacturersModule {}
