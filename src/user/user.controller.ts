import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';
import { UserPublicEntity } from './entities/user.entity';

@UseGuards(JwtGuard)
@Controller('users')
@ApiBearerAuth()
@ApiTags('Users')
export class UserController {
  constructor(private userService: UserService) {}
  // @UseGuards(AuthGuard)
  // @Get('/info')
  // getUserInfo(@Req() req) {
  //   return req.user;
  // }

  @Get('/info')
  @ApiOperation({ summary: 'Get User Info' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiOkResponse({ type: UserPublicEntity })
  getUserInfo(@GetUser() user: User) {
    return user;
  }

  @Patch()
  @ApiOperation({ summary: 'Edit User By userId' })
  @ApiResponse({
    status: 200,
    description: 'Edit Success',
    type: UserPublicEntity,
  })
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
