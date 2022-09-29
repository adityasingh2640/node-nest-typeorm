import { Expose, Transform } from "class-transformer";
import { User } from "src/user/user.entity";

export class ReportDto{
    @Expose()
    id: number;
    @Expose()
    price: number;
    @Expose()
    make:string;
    @Expose()
    model:string;
    @Expose()
    year:number;
    @Expose()
    longitude:number
    @Expose()
    latitude:number
    @Expose()
    mileage:number
    @Expose()
    approved:boolean

    @Transform(({obj})=>obj.user.id) // take the report ob
    @Expose()
    userId:number
}