import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";
import { User } from "../user.entity";
import { UserService } from "../user.service";

/**
 * Below interface is create to allow addition of currentUser and session in Request instance
 * else typescript will give error
 */
export interface RequestWithUser extends Request {
    currentUser?: User;
    session?: any
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private userService: UserService) { }
    async use(req: RequestWithUser, res: Response, next: NextFunction) {
        const { userId } = req.session || {};
        if (userId) {
            const user = await this.userService.findOne(userId);
            req.currentUser = user;
        }
        next();
    }
}