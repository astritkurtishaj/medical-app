import { Module } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { VariantsController } from './variants.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Variant, VariantSchema } from './schemas/variant.schema';
import { Product, ProductSchema } from 'src/products/schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Variant.name, schema: VariantSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])

  ],
  controllers: [VariantsController],
  providers: [VariantsService],
  exports: [VariantsService]
})
export class VariantsModule {}
