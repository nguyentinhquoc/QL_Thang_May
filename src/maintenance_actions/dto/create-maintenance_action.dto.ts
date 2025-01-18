import { IsNotEmpty } from 'class-validator'
import { Maintenance } from 'src/maintenance/entities/maintenance.entity'
import { Staff } from 'src/staffs/entities/staff.entity'

export class CreateMaintenanceActionDto {
  @IsNotEmpty()
  staff: Staff
  @IsNotEmpty()
  weight?: number
  @IsNotEmpty()
  maintenance: Maintenance
  status?: Date
  feedback?: string
  image?: string
}
