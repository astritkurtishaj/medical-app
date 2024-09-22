import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Manufacturer } from 'src/manufacturers/schemas/manufacturer.schema';

@Schema()
export class Vendor extends Document {
 //define Vendor schema here
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);