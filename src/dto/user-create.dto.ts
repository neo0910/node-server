import {Exclude, Expose} from 'class-transformer';
import {IsNumber, IsString} from 'class-validator';

@Exclude()
export class UserCreateDto {
  @Expose()
  @IsString()
  firstName: string;

  @Expose()
  @IsString()
  lastName: string;

  @Expose()
  @IsNumber()
  age: number;
}
