import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import * as fs from 'fs';
import * as readline from 'readline';
import { CreateProductDto } from './dto/create-product.dto';
import { Manufacturer } from 'src/manufacturers/schemas/manufacturer.schema';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>, @InjectModel(Manufacturer.name) private manufacturerModel: Model<Manufacturer>) {}

  async create(productDto: CreateProductDto): Promise<Product> {
    // console.log(productDto);
    const { productId, manufacturer } = productDto;
    const manufacturerExists = await this.manufacturerModel.findById(manufacturer);

    if (!manufacturerExists) {
      throw new BadRequestException(`Manufacturer with id: ${manufacturer} do not exist`);
    }

    const existingProduct = await this.productModel.findOne({ productId: productId, manufacturer: manufacturerExists._id });
    
    if (existingProduct) {
      return this.productModel.findOneAndUpdate(
        { _id: existingProduct._id },
        { $set: productDto },
        { new: true }
      );
    } else {
      const newProduct = await this.productModel.create(productDto);

      await this.manufacturerModel.findOneAndUpdate(
        { _id: manufacturerExists._id },
        { $push: { products: newProduct._id } }
      );

      return newProduct;
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find({}).populate('manufacturer').populate('variants', '', );
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findOne({productId: id});
  }

  async update(id: string, productDto: any): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, productDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id).exec();
  }
}