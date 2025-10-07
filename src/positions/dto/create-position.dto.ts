import { IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePositionDto {
  @IsString({message: 'Tên chức vụ phải là chuỗi'})
  @IsNotEmpty({message: 'Tên chức vụ không được để trống'})
  name: string
  @IsString({message: 'Mô tả phải là chuỗi'})
  @IsOptional()
  description?:string
}
