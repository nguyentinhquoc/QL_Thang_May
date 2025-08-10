import { IsNotEmpty, IsString } from 'class-validator'
import { Department } from 'src/departmens/entities/departmen.entity'

export class CreateStepDto {
  id: number
  @IsNotEmpty()
  @IsString()
  name: string
  @IsString()
  description: string
  department: []
}
