import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserPublicEntity implements Omit<User, 'hash'> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class UserEntity extends UserPublicEntity {
  @ApiProperty()
  hash: string;
}
