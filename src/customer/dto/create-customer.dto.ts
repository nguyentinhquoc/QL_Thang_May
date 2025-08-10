import {IsArray, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength} from 'class-validator'
import { Staff } from 'src/staffs/entities/staff.entity'
export class CreateCustomerDto {
  @IsNotEmpty()
  @MaxLength(255)
  full_name: string
  @IsNotEmpty()
  @IsPhoneNumber('VN')
  number_phone: string
  @IsOptional()
  @MaxLength(255)
  email?: string
  @IsOptional()
  @IsString()
  address?: string
  @MaxLength(225)
  description: string
  @IsString()
  city: string
  @IsString()
  district: string
  @IsString()
  ward: string
  @IsOptional()
  @IsString({each: true, message: 'Mỗi nhân viên chính phải là chuỗi'})
  staffMain?: Staff 
  staff?: Staff 
}
