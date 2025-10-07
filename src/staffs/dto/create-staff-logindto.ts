import { IsNotEmpty, IsString } from 'class-validator'
export class LoginDto {
  @IsString({message: 'Email phải là chuỗi'})
  @IsNotEmpty({message: 'Email không được để trống'})
  email: string
  @IsString({message: 'Mật khẩu phải là chuỗi'})
  @IsNotEmpty({message: 'Mật khẩu không được để trống'})
  password: string
}