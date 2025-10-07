import {IsArray, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength} from 'class-validator'
import { Staff } from 'src/staffs/entities/staff.entity'
export class CreateCustomerDto {
  @IsNotEmpty({message: 'Tên đầy đủ không được để trống'})
  @MaxLength(255, {message: 'Tên đầy đủ không được vượt quá 255 ký tự'})
  full_name: string
  @IsNotEmpty({message: 'Số điện thoại không được để trống'})
  @IsPhoneNumber('VN', {message: 'Số điện thoại không hợp lệ'})
  number_phone: string
  @IsOptional()
  @MaxLength(255, {message: 'Email không được vượt quá 255 ký tự'})
  email?: string
  @IsOptional()
  @IsString({message: 'Địa chỉ phải là chuỗi'})
  address?: string
  @MaxLength(225, {message: 'Mô tả không được vượt quá 225 ký tự'})
  description: string
  @IsString({message: 'Tỉnh/Thành phố phải là chuỗi'})
  city: string
  @IsString({message: 'Quận/Huyện phải là chuỗi'})
  district: string
  @IsString({message: 'Phường/Xã phải là chuỗi'})
  ward: string
  @IsOptional()
  @IsString({each: true, message: 'Mỗi nhân viên chính phải là chuỗi'})
  staffMain?: Staff 
  staff?: Staff 
}
