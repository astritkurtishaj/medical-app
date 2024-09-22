import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ProductsService } from './products/products.service';

@Injectable()
export class AppService {
  constructor(private readonly productService: ProductsService){}
  getHello(): string {
    return 'Hello World!';
  }
}
