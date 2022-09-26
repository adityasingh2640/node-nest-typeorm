/**
 * This DTO is used in creation of Custom Interceptor for changes in incoming and outgoing payload of user instance
 */

import { Expose } from "class-transformer"

export class UserDto{
    @Expose()
    id:number;
    @Expose()
    email:string;
}