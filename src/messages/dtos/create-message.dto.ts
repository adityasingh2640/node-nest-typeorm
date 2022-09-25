// dto : Data Transfer Object
// these DTO are used to validate request body
import { IsNotEmpty, IsString } from "class-validator";
//class-transformer

export class CreateMessageDTO{
    @IsNotEmpty()
    @IsString()
    content:string;
}