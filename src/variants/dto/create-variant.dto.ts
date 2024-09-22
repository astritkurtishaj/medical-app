import { IsString, IsNotEmpty, IsBoolean, IsArray, IsOptional, IsNumber } from 'class-validator';

export class ImageDto {
  @IsString()
  @IsOptional()
  fileName?: string;

  @IsString()
  @IsOptional()
  cdnLink?: string;

  @IsOptional()
  @IsNumber()
  i?: number;

  @IsOptional()
  @IsString()
  alt?: string;
}

export class CreateVariantDto {
  @IsString()
  @IsNotEmpty()
  variantId: string;

  @IsString()
  @IsNotEmpty()
  product: string;

  @IsArray()
  @IsOptional()
  images?: ImageDto[];

  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  price: string;
}