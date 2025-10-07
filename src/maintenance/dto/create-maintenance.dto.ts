import { IsDate, IsNotEmpty, IsString } from 'class-validator'
import { HistoryMaintenance } from 'src/history-maintenance/entities/history-maintenance.entity'
import { Project } from 'src/project/entities/project.entity'

export class CreateMaintenanceDto {
  @IsString({message: 'Thời gian phải là chuỗi'})
  @IsNotEmpty({message: 'Thời gian không được để trống'})
  time: Date
  @IsNotEmpty({message: 'Dự án không được để trống'})
  project: Project
  reason?: string
  projectName?: string
  confirmSuccess?: boolean
  fee?: boolean
  historyMaintenance:HistoryMaintenance
}
