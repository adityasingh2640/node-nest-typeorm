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
    longitude:string
    @Expose()
    latitude:string
    @Expose()
    mileage:number

    @Transform(({obj})=>obj.user.id) // take the report ob
    @Expose()
    user_id:number
}