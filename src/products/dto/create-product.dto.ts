import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { Variant } from 'src/variants/schemas/variant.schema';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @IsArray()
  @IsOptional()
  variants?: Variant[];

  @IsString()
  @IsNotEmpty()
  availability: string;
}
