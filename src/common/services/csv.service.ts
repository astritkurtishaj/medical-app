import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as fs from 'fs';
import * as readline from 'readline';
import { ProductsService } from 'src/products/products.service';
import { CreateManufacturerDto } from 'src/manufacturers/dto/create-manufacturer.dto';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { CreateVariantDto, ImageDto } from 'src/variants/dto/create-variant.dto';
import { ManufacturersService } from 'src/manufacturers/manufacturers.service';
import { VariantsService } from 'src/variants/variants.service';

@Injectable()
export class CSVService {
    constructor(
        private readonly manufacturerService: ManufacturersService,
        private readonly productService: ProductsService,
        private readonly variantService: VariantsService
    ) {}

    @Cron('5 * * * * *')
    async handleCSVFile(): Promise<void> {
    const headers = [
        'SiteSource',
        'ItemID',
        'ManufacturerID',
        'ManufacturerCode',
        'ManufacturerName',
        'ProductID',
        'ProductName',
        'ProductDescription',
        'ManufacturerItemCode',
        'ItemDescription',
        'ImageFileName',
        'ItemImageURL',
        'NDCItemCode',
        'PKG',
        'UnitPrice',
        'QuantityOnHand',
        'PriceDescription',
        'Availability',
        'PrimaryCategoryID',
        'PrimaryCategoryName',
        'SecondaryCategoryID',
        'SecondaryCategoryName',
        'CategoryID',
        'CategoryName',
        'IsRX',
        'IsTBD',
    ];
    const filePath = '/Users/astrit/AstritData/medical-app/images40.txt';
    const readInterface = readline.createInterface({
        input: fs.createReadStream(filePath),
        output: process.stdout,
        terminal: false,
    });

    let isFirstLine = true;

    for await (const line of readInterface) {
        if (isFirstLine) {
            isFirstLine = false;
            continue;
        }

        const values = line.split('\t');
        if (values.length === headers.length) {
        const entry = {};

        let count = 0;
        for (let index = 0; index < headers.length; index++) {
            entry[headers[index]] = values[index];
        }
        //   results.push(entry);
        await this.handleCSVData(entry);
        console.log('entry....', entry);
        }
    }
    }

    async handleCSVData(data: any): Promise<void> {
        const manufacturerDataDto: CreateManufacturerDto = {
            name: data['ManufacturerName'],
            manufacturerId: data['ManufacturerID'],
            manufacturerCode: data['ManufacturerCode']
        }


        const currentManufacturer = await this.manufacturerService.create(manufacturerDataDto);


        const productDataDto: CreateProductDto = {
            name: data['ProductName'],
            productId: data['ProductID'],
            description: data['ProductDescription'] ? data['ProductDescription'] : 'Dummy description',
            manufacturer: currentManufacturer._id as string,
            availability: data['Availability'] ? 'available' : 'not available'
        }


        const currentProduct = await this.productService.create(productDataDto);

        const image: ImageDto = {
            fileName: data['ImageFileName'],
            cdnLink: data['ItemImageURL']
        }
        const variantDataDto: CreateVariantDto = {
            variantId: data['ItemID'],
            product: currentProduct._id as string,
            description: data['ItemDescription'] ? data['ItemDescription'] : 'dummy description',
            price: data['UnitPrice'] ? data['UnitPrice'] as string : '0.0',
            images: [image]
        }

        const currentVariant = await this.variantService.create(variantDataDto);


        // TODO: handle the file when everything is done delete it
        // otherwise we will keep reading it all the time
        
    }
}