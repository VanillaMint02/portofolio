import { UserDomain } from '../domain/user.domain';
import { UserDto } from '../dto/user.dto';

export class UserMapper {
  static mapToDto(model: UserDomain): UserDto {
    return new UserDto({
      id: model.id,
      name: model.name,
      email: model.email,
      password: model.password,
      role: model.role,
    });
  }

  static mapToDomain(dto: UserDto) {
    return new UserDomain({
      id: dto.id,
      name: dto.name,
      email: dto.email,
      password: dto.password,
      role: dto.role,
    });
  }
}
