import { IsString, IsNotEmpty, IsInt } from 'class-validator'
import { Project } from 'src/project/entities/project.entity'
import { Staff } from 'src/staffs/entities/staff.entity'

export class CreateNotificationDto {
  @IsString({message: 'Tiêu đề phải là chuỗi'})
  @IsNotEmpty({message: 'Tiêu đề không được để trống'})
  title: string
  @IsString({message: 'Nội dung phải là chuỗi'})
  @IsNotEmpty({message: 'Nội dung không được để trống'})
  message: string
  @IsNotEmpty({message: 'Nhân viên không được để trống'})
  staff: Staff
  @IsNotEmpty({message: 'Dự án không được để trống'})
  project: Project
}
