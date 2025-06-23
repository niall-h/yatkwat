import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail(undefined, { message: 'Please enter a valid email address.' })
  email: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have at least 3 characters.' })
  username: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;

  @IsInt()
  age: number;

  @IsNotEmpty()
  @IsEnum(['f', 'm', 'u'])
  gender: string;
}
