import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManufacturersService } from './manufacturers.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Controller('manufacturers')
export class ManufacturersController {
  constructor(private readonly manufacturersService: ManufacturersService) {}

  @Post()
  async create(@Body() createManufacturerDto: CreateManufacturerDto) {
    return await this.manufacturersService.create(createManufacturerDto);
  }

  @Get()
  async findAll() {
    return await this.manufacturersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manufacturersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManufacturerDto: UpdateManufacturerDto) {
    return this.manufacturersService.update(+id, updateManufacturerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manufacturersService.remove(+id);
  }
}
