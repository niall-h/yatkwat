import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.password = createUserDto.password;

    return this.userRepo.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }

  findById(id: number): Promise<User | null> {
    return this.userRepo.findOneBy({ id });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userRepo.findOneBy({ username });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.username && updateUserDto.username !== user.username) {
      const existing = await this.userRepo.findOne({
        where: {
          username: updateUserDto.username,
          id: Not(id),
        },
      });

      if (existing) {
        throw new ConflictException('Username is already in use.');
      }
    }

    updateUserDto.username = updateUserDto.username?.trim().toLowerCase();

    Object.entries(updateUserDto).forEach(([key, value]) => {
      if (value !== undefined) {
        user[key] = value;
      }
    });

    return this.userRepo.save(user);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.userRepo.delete(id);
  }
}
