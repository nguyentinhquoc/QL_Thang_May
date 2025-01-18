import { Module, forwardRef } from '@nestjs/common'
import { MaintenanceService } from './maintenance.service'
import { MaintenanceController } from './maintenance.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Maintenance } from './entities/maintenance.entity'
import { ProjectModule } from 'src/project/project.module'
import { StaffsModule } from 'src/staffs/staffs.module'
import { MaintenanceAction } from 'src/maintenance_actions/entities/maintenance_action.entity'
import { MaintenanceActionsService } from 'src/maintenance_actions/maintenance_actions.service'
@Module({
  imports: [
    TypeOrmModule.forFeature([Maintenance, MaintenanceAction]),
    forwardRef(() => ProjectModule),
    StaffsModule
  ],
  controllers: [MaintenanceController],
  providers: [MaintenanceService, MaintenanceActionsService],
  exports: [MaintenanceService],
})
export class MaintenanceModule {}