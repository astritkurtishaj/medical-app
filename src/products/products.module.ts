import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product.schema';
import { Manufacturer, ManufacturerSchema } from 'src/manufacturers/schemas/manufacturer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Manufacturer.name, schema: ManufacturerSchema }]),
    // MongooseModule.forFeature([{ name: Variant.name, schema: VariantSchema }]),
    // MongooseModule.forFeature([{ name: Vendor.name, schema: VendorSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
