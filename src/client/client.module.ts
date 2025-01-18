import { Module } from '@nestjs/common'
import { ClientService } from './client.service'
import { ClientController } from './client.controller'
import { StaffsModule } from 'src/staffs/staffs.module'
import { ProjectStepsModule } from 'src/project_steps/project_steps.module'
import { ProjectModule } from 'src/project/project.module'
import { WorkflowStepsModule } from 'src/workflow_steps/workflow_steps.module'
import { MaintenanceActionsModule } from 'src/maintenance_actions/maintenance_actions.module'
import { ProjectStaffModule } from 'src/project_staff/project_staff.module'

@Module({
  imports: [
    StaffsModule,
    ProjectStepsModule,
    ProjectModule,
    WorkflowStepsModule,
    MaintenanceActionsModule,
    ProjectStaffModule
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
