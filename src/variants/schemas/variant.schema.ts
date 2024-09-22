import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema()
export class Image extends Document {
  @Prop({ required: false, default: '' })
  fileName: string;

  @Prop({ required: false, default: '' })
  cdnLink: string;

  @Prop({ required: false, default: 0 })
  i: number;

  @Prop({ required: false, default: null })
  alt: string;
}

@Schema()
export class Variant extends Document {
  @Prop({ required: true })
  variantId: string;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Types.ObjectId;

  @Prop({ type: [{ type: Image }], default: [] })
  images: Image[]

  @Prop({ required: false, default: true })
  available: boolean;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: string;

}

export const VariantSchema = SchemaFactory.createForClass(Variant);
