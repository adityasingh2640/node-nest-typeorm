import { Transform } from "class-transformer";
import { IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString, Max, Min, min } from "class-validator";

export class GetEstimateDto{

    @IsNotEmpty()
    @IsString()
    make:string;

    @IsNotEmpty()
    @IsString()
    model:string;

    @Transform(({value})=>parseInt(value))
    @IsNotEmpty()
    @IsNumber()
    @Min(1930)
    @Max(2050)
    year:number;

    @Transform(({value})=>parseFloat(value))
    @IsNotEmpty()
    @IsLongitude()
    longitude:number;

    @Transform(({value})=>parseFloat(value))
    @IsNotEmpty()
    @IsLatitude()
    latitude:number;

    @Transform(({value})=>parseInt(value))
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(50)
    mileage:number;
}