import { PartialType } from '@nestjs/mapped-types'
import { CreateProjectDto } from './create-project.dto'

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  checkEdit?:string
  warrantyStart?: Date
  warrantyEnd?: Date
  maintenanceFitEnd?: Date
  maintenanceFitStart?: Date
  tax?: string
}
