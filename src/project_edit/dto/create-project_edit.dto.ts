import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsEmail,
  IsString,
  MaxLength
} from 'class-validator'
import { Project } from 'src/project/entities/project.entity'
import { Staff } from 'src/staffs/entities/staff.entity'
export class CreateProjectEditDto {
  @IsOptional()
  workflow: number
  @IsNotEmpty({message: 'Tên đầy đủ không được để trống'})
  @MaxLength(255, {message: 'Tên đầy đủ không được vượt quá 255 ký tự'})
  full_name: string
  @IsNotEmpty({message: 'Số điện thoại không được để trống'})
  @IsPhoneNumber('VN', {message: 'Số điện thoại không hợp lệ'})
  number_phone: string
  @IsOptional()
  // @IsEmail()
  @MaxLength(255, {message: 'Email không được vượt quá 255 ký tự'})
  email?: string
  @IsOptional()
  @IsString({message: 'Địa chỉ phải là chuỗi'})
  address?: string
  @IsOptional()
  @IsString({message: 'Thông tin sản phẩm phải là chuỗi'})
  infor_product: string
  staff: Staff
  project: Project
  @IsOptional()
  price?: number
  @IsOptional()
  tax?: string
  @IsString({message: 'Mã dự án phải là chuỗi'})
  code_project: string
  @MaxLength(225, {message: 'Mô tả không được vượt quá 225 ký tự'})
  description?: string
  @IsOptional()
  steps?: string
  dongCo?: string
  tuDien?: string
  capTai?: string
  congSuat?: string
  hoThang?: string
  cabin?: string
  cua?: string
  pit?: string
  oh?: string
  phongMay?: string
}
