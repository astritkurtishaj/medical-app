import { Injectable } from '@nestjs/common';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Manufacturer } from './schemas/manufacturer.schema';
import { Model } from 'mongoose';

@Injectable()
export class ManufacturersService {
  constructor(@InjectModel(Manufacturer.name) private manufacturerModel: Model<Manufacturer>) {}
  async create(createManufacturerDto: CreateManufacturerDto) {
    const { manufacturerId } = createManufacturerDto;
    
    // const existingManufacturer = await this.manufacturerModel.findOne({ manufacturerId });

  return await this.manufacturerModel.findOneAndUpdate(
      { manufacturerId },
      { $set: createManufacturerDto },
      { new: true, upsert: true }
  );
    
    // return exists;
    // if (existingManufacturer) {
    //   return this.manufacturerModel.findOneAndUpdate(
    //     { manufacturerId },
    //     { $set: createManufacturerDto },
    //     { new: true } 
    //   );
    // } else {
    //   return await this.manufacturerModel.create(createManufacturerDto);
    // }
  }

  async findAll() {
    return await this.manufacturerModel.find({}).populate('products', '', 'Product');
  }

  findOne(id: number) {
    return `This action returns a #${id} manufacturer`;
  }

  update(id: number, updateManufacturerDto: UpdateManufacturerDto) {
    return `This action updates a #${id} manufacturer`;
  }

  remove(id: number) {
    return `This action removes a #${id} manufacturer`;
  }
}
