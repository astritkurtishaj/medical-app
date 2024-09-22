import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { Product } from 'src/products/schemas/product.schema';

export class CreateManufacturerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  manufacturerId: string;

  @IsString()
  @IsNotEmpty()
  manufacturerCode: string;

  @IsArray()
  @IsOptional()
  products?: Product[];
}
