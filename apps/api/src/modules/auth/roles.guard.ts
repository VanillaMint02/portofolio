import {CanActivate, ExecutionContext, Injectable,} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {UserService} from '../user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private userService: UserService) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const {user} = context.switchToHttp().getRequest();
        const dto = await this.userService.getUserByEmail(user.email);
        return true;
    }
}
