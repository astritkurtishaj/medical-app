import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

@Schema()
export class Manufacturer extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  manufacturerId: string;

  @Prop({ required: true })
  manufacturerCode: string;
  
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }], default: [] })
  products: Types.ObjectId[];

}

export const ManufacturerSchema = SchemaFactory.createForClass(Manufacturer);