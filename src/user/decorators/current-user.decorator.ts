import { createParamDecorator, ExecutionContext } from "@nestjs/common";

/**
 * Never is used so that data argument cannot be used , value cannot be passed in this argument 
 * from calling function, else typsecript will give error
 */
export const CurrentUser = createParamDecorator((data:never,context:ExecutionContext)=>{
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
}); 