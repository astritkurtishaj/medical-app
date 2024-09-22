import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVariantDto } from './dto/create-variant.dto';
import { UpdateVariantDto } from './dto/update-variant.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Variant } from './schemas/variant.schema';
import { Model } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';

@Injectable()
export class VariantsService {
  constructor(@InjectModel(Variant.name) private variantModel: Model<Variant>, @InjectModel(Product.name) private productModel: Model<Product>) {}
  async create(createVariantDto: CreateVariantDto) {
    const { variantId, product } = createVariantDto;

    const existingProduct = await this.productModel.findById(product);

    if(!existingProduct) {
      throw new BadRequestException(`Product with ID: ${product} do not exist!`)
    }
    
    const existingVariant = await this.variantModel.findOne({ variantId: variantId, product: product });
    
    if (existingVariant) {
      return this.variantModel.findOneAndUpdate(
        { _id: existingVariant._id },
        { $set: createVariantDto },
        { new: true }
      );
    } else {
      const newVariant = await this.variantModel.create(createVariantDto);
      await this.productModel.findOneAndUpdate(
        { _id: existingProduct._id },
        { $push: { variants: newVariant._id } }
      );
      return newVariant;
    }
  }

  findAll() {
    return `This action returns all variants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variant`;
  }

  update(id: number, updateVariantDto: UpdateVariantDto) {
    return `This action updates a #${id} variant`;
  }

  remove(id: number) {
    return `This action removes a #${id} variant`;
  }
}
