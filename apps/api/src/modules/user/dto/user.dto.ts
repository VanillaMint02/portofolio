import {ApiProperty} from '@nestjs/swagger';
import {UserRole} from "../domain/user-roles";

export class UserDto {
    @ApiProperty({
        description: 'Automatically generated, its the ID of the user',
        example: 'A string that is going to be automatically generated',
        required: true,
    })
    id?: string;
    @ApiProperty({
        description: 'The name of the user',
        example: 'John Snow',
        required: true,
    })
    name: string;
    @ApiProperty({
        description: 'The e-mail of the user. A valid e-mail as well.',
        example: 'JohnSnow@Kingslanding.com',
        required: true,
    })
    email: string;
    @ApiProperty({
        description: 'The Password of the user',
        example: 'TheUnbeatableUnknownPassword01',
        required: true,
    })
    password: string;
    @ApiProperty({
        description: 'The role of our user',
        example: "ADMIN",
        required: true,
    })
    role: UserRole;

    constructor(values: Partial<UserDto>) {
        if (values) {
            this.id = values.id;
            this.email = values.email;
            this.name = values.name;
            this.role = values.role
        }
    }
}
