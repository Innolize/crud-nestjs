import { IsDate, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator'

export class CreateProductDTO {
    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly imageURL: string;

    @IsNumber()
    @IsPositive()
    readonly price: number;

    @IsOptional()
    @IsDate()
    readonly createdAt: Date;
}