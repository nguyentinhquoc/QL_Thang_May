import { IsNotEmpty, IsString } from 'class-validator'

export class CreateWorkflowDto {
  @IsNotEmpty({message: 'Tên quy trình không được để trống'})
  @IsString({message: 'Tên quy trình phải là chuỗi'})
  name: string
  @IsString({message: 'Mô tả phải là chuỗi'})
  description: string
}
