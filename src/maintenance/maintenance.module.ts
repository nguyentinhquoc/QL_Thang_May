import { Module, forwardRef } from '@nestjs/common'
import { MaintenanceService } from './maintenance.service'
import { MaintenanceController } from './maintenance.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Maintenance } from './entities/maintenance.entity'
import { ProjectModule } from 'src/project/project.module'
import { StaffsModule } from 'src/staffs/staffs.module'
import { MaintenanceAction } from 'src/maintenance_actions/entities/maintenance_action.entity'
import { MaintenanceActionsService } from 'src/maintenance_actions/maintenance_actions.service'
import { HistoryMaintenanceService } from 'src/history-maintenance/history-maintenance.service'
import { HistoryMaintenanceModule } from 'src/history-maintenance/history-maintenance.module'
import { HistoryMaintenance } from 'src/history-maintenance/entities/history-maintenance.entity'
@Module({
  imports: [
    TypeOrmModule.forFeature([Maintenance, MaintenanceAction,HistoryMaintenance]),
    forwardRef(() => ProjectModule),
    StaffsModule,
    HistoryMaintenanceModule],
  controllers: [MaintenanceController],
  providers: [ MaintenanceService, MaintenanceActionsService],
  exports: [MaintenanceService],
})
export class MaintenanceModule {}