import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength } from 'class-validator';
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
}
