import {Transform} from 'class-transformer'
import {IsBoolean, IsNotEmpty, IsDateString, IsNumber} from 'class-validator'
import {Project} from 'src/project/entities/project.entity'

export class CreateHistoryMaintenanceDto {
  @IsNotEmpty({message: 'Dự án không được để trống'})
  project: Project

  @IsNotEmpty({message: 'Thời gian bắt đầu không được để trống'})
  @IsDateString({}, {message: 'Thời gian bắt đầu phải là ngày hợp lệ'})
  timeStart: Date

  @IsNotEmpty({message: 'Giá không được để trống'})
  @Transform(({value}) => Number(value))
  @IsNumber({}, {message: 'Giá phải là số'})
  price: number

  @IsNotEmpty({message: 'Thời gian kết thúc không được để trống'})
  @IsDateString({},{message: 'Thời gian kết thúc phải là ngày hợp lệ'})
  timeEnd: Date

  @IsNotEmpty({message: 'Số lần bảo trì không được để trống'})
  @IsNumber({}, {message: 'Số lần bảo trì phải là số'})
  @Transform(({value}) => Number(value))
  countMaintenance: number

  @Transform(({value}) => value === 'true' || value === true)
  @IsBoolean({message: 'Miễn phí phải là kiểu boolean'})
  free: boolean
}
