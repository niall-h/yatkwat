import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { DeleteResult } from 'typeorm';
import { AuthGuard, JwtPayload } from 'src/auth/auth.guard';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) =>
      plainToInstance(UserResponseDto, user, {
        excludeExtraneousValues: true,
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getProfile(@Req() req: Request): Promise<UserResponseDto> {
    const user = await this.userService.findById((req.user as JwtPayload).sub);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async find(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.userService.findById(+id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ): Promise<UserResponseDto> {
    if (+id !== (req.user as JwtPayload).sub) {
      throw new ForbiddenException('You can only update your own profile');
    }
    const user = await this.userService.update(+id, updateUserDto);

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean }> {
    const result = await this.userService.remove(+id);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }

    return { success: true };
  }
}
