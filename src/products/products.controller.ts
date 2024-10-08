import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() productDto: any): Promise<Product> {
    return await this.productsService.create(productDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() productDto: any): Promise<Product> {
    return this.productsService.update(id, productDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Product> {
    return this.productsService.delete(id);
  }
}