/**
 * Interceptor act as a middleware
 * We can change the incoming  request to server and outgoing request from server
 * Additionally we can create a DTO and only expose requried property by using 'Expose'
 */

import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

// Custom Decorator
export function Serialize(dto:any){
    return UseInterceptors(new SerializeInterceptor(dto));
}
export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto:any){}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        
        //Run something before incoming request is handled
        // by the request handler
        
        return next.handle().pipe(
            // Will be called when request is going out from the server
            map((data: any) => {
                return plainToInstance(this.dto,data,{
                    excludeExtraneousValues:true // this property hello in remove properties which are not excluded
                })
            })
        )
    }
}