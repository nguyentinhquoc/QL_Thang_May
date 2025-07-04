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
  @IsNotEmpty()
  @MaxLength(255)
  full_name: string
  @IsNotEmpty()
  @IsPhoneNumber('VN')
  number_phone: string
  @IsOptional()
  // @IsEmail()
  @MaxLength(255)
  email?: string
  @IsOptional()
  @IsString()
  address?: string
  @IsOptional()
  @IsString()
  infor_product?: string
  staff: Staff
  project: Project
  @IsOptional()
  price?: number
  @IsOptional()
  tax?: string
  @IsString()
  code_project: string
  @MaxLength(225)
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
