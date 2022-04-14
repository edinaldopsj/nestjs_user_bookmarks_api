import { UserService } from './user.service';
import { Controller, Get, Patch, UseGuards, Body } from '@nestjs/common';
import { User } from '@prisma/client';
import { EditUserDto } from './dto/edit-user.dto';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { GetUser } from './../auth/decorator';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
