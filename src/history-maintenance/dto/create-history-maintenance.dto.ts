import {Transform} from 'class-transformer'
import {IsBoolean, IsNotEmpty, IsDateString, IsNumber} from 'class-validator'
import {Project} from 'src/project/entities/project.entity'

export class CreateHistoryMaintenanceDto {
  @IsNotEmpty()
  project: Project

  @IsNotEmpty()
  @IsDateString()
  timeStart: Date

  @IsNotEmpty()
  @Transform(({value}) => Number(value))
  @IsNumber()
  price: number

  @IsNotEmpty()
  @IsDateString()
  timeEnd: Date

  @IsNotEmpty()
  @IsNumber()
  @Transform(({value}) => Number(value))
  countMaintenance: number

  @Transform(({value}) => value === 'true' || value === true)
  @IsBoolean()
  free: boolean
}
