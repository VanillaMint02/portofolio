import {TypeOrmModule} from '@nestjs/typeorm';
import {UserDomain} from './domain/user.domain';
import {UserService} from './user.service';
import {Module} from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([UserDomain])],
    controllers: [],
    providers: [UserService],
    exports: [TypeOrmModule, UserService],
})
export class UserModule {
}
