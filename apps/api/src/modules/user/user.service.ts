import {Injectable, NotFoundException,} from '@nestjs/common';
import {UserDomain} from './domain/user.domain';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {UserDto} from './dto/user.dto';
import {UserMapper} from './mappers/user.mapper';
import {LoginUserDto} from './dto/login-user.dto';
import {compare,} from 'bcrypt';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserDomain)
        private userDomainRepository: Repository<UserDomain>,
    ) {
    }

    private async readUserDomainByEmail(email: string): Promise<UserDomain> {
        const foundModel = await this.userDomainRepository.findOne({
            where: {email},
        });
        if (!foundModel) {
            throw new NotFoundException();
        }
        return foundModel;
    }

    private async readUserDomainById(id: string): Promise<UserDomain> {
        const foundModel = await this.userDomainRepository.findOne({
            where: {id},
        });
        if (!foundModel) {
            throw new NotFoundException();
        }
        return foundModel;
    }

    async getUserByEmail(email: string): Promise<UserDto> {
        const foundModel = await this.readUserDomainByEmail(email);
        return UserMapper.mapToDto(foundModel);
    }

    async checkCredentials(loginUserDto: LoginUserDto): Promise<boolean> {
        const foundModel = await this.userDomainRepository.findOneBy({
            email: loginUserDto.email,
        });
        if (!foundModel) {
            return false;
        }
        return compare(loginUserDto.password, foundModel.password);
    }

    async getUserById(id: string): Promise<UserDto> {
        const foundModel = await this.readUserDomainById(id);
        return UserMapper.mapToDto(foundModel);
    }


}
