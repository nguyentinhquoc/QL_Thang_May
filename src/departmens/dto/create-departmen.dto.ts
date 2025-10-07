import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateDepartmenDto {
  @IsString({message: 'Tên phòng ban phải là chuỗi'})
  @IsNotEmpty({message: 'Tên phòng ban không được để trống'})
  name: string
  @IsOptional()
  description?: string
}
