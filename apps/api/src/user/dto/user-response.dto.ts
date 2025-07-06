import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  name?: string;

  @Expose()
  age?: number;

  @Expose()
  gender?: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;
}
