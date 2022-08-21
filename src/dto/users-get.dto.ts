import {Exclude, Expose} from 'class-transformer';
import {IsNumberString} from 'class-validator';

@Exclude()
export class UsersGetDto {
  @Expose()
  @IsNumberString()
  id: number;
}
