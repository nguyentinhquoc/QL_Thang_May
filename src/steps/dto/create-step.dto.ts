import { IsNotEmpty, IsString } from 'class-validator'
import { Department } from 'src/departmens/entities/departmen.entity'

export class CreateStepDto {
  id: number
  @IsNotEmpty({message: 'Tên bước không được để trống'})
  @IsString({message: 'Tên bước phải là chuỗi'})
  name: string
  @IsString({message: 'Mô tả phải là chuỗi'})
  description: string
  department: []
}
