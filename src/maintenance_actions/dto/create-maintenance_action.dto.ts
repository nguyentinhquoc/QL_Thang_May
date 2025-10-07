import { IsNotEmpty } from 'class-validator'
import { Maintenance } from 'src/maintenance/entities/maintenance.entity'
import { Staff } from 'src/staffs/entities/staff.entity'

export class CreateMaintenanceActionDto {
  @IsNotEmpty({message: 'Nhân viên không được để trống'})
  staff: Staff
  @IsNotEmpty({message: 'Trọng số không được để trống'})
  weight?: number
  @IsNotEmpty({message: 'Bảo trì không được để trống'})
  maintenance: Maintenance
  status?: Date
  feedback?: string
  image?: string
}
