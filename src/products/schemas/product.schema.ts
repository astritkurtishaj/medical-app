import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Variant } from 'src/variants/schemas/variant.schema';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false, default: '' })
  type: string;

  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Manufacturer', required: true })
  manufacturer: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Variant' }], default: [] })
  variants: Types.ObjectId[];

  @Prop({ required: true })
  availability: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);