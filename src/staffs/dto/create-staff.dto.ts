import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator'
import { Department } from 'src/departmens/entities/departmen.entity'
import { Position } from 'src/positions/entities/position.entity'
export class CreateStaffDto {
  @IsString({message: 'Họ và tên phải là chuỗi'})
  full_name?: string

  @IsNotEmpty({message: 'Phòng ban không được để trống'})
  department: Department

  @IsNotEmpty({message: 'Chức vụ không được để trống'})
  position: Position

  @IsPhoneNumber('VN', {message: 'Số điện thoại không hợp lệ'})
  @IsNotEmpty({message: 'Số điện thoại không được để trống'})
  number_phone: string

  @IsEmail({}, {message: 'Email không hợp lệ'})
  @IsNotEmpty({message: 'Email không được để trống'})
  email: string

  @IsOptional()
  @IsString({message: 'Địa chỉ phải là chuỗi'})
  address?: string

  @IsOptional()
  @IsString({message: 'Ảnh đại diện phải là chuỗi'})
  avatar: string

  @IsOptional()
  @IsString({message: 'Mô tả phải là chuỗi'})
  description?: string
  password?: string
}
