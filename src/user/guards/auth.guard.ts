/**
 * Guard are used to give acess and can be applied at module, controller,route level
 * It must return a truthy value if want to acess above level
 */

import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AuthGuard implements CanActivate{
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        return request.session.userId; 
    }
}