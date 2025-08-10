import { forwardRef, Module } from '@nestjs/common'
import { ProjectService } from './project.service'
import { ProjectController } from './project.controller'
import { Project } from './entities/project.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WorkflowStepsModule } from 'src/workflow_steps/workflow_steps.module'
import { WorkflowsModule } from 'src/workflows/workflows.module'
import { StepsModule } from 'src/steps/steps.module'
import { StaffsModule } from 'src/staffs/staffs.module'
import { ProjectStepsModule } from 'src/project_steps/project_steps.module'
import { ProjectEditModule } from 'src/project_edit/project_edit.module'
import { NotificationModule } from 'src/notification/notification.module'
import { SendMailService } from 'src/send-mail/send-mail.service'
import { MaintenanceModule } from 'src/maintenance/maintenance.module'
import { DepartmensModule } from 'src/departmens/departmens.module'
import { ProjectStaff } from 'src/project_staff/entities/project_staff.entity'
import { ProjectStaffModule } from 'src/project_staff/project_staff.module'
import { HistoryMaintenance } from 'src/history-maintenance/entities/history-maintenance.entity'
import { HistoryMaintenanceModule } from 'src/history-maintenance/history-maintenance.module'
@Module({
  imports: [
    TypeOrmModule.forFeature([Project,HistoryMaintenance]),
    WorkflowsModule,
    StepsModule,
    WorkflowStepsModule,
    StaffsModule,
    ProjectStepsModule,
    ProjectStaffModule,
    NotificationModule,
    DepartmensModule,
    HistoryMaintenanceModule,
    forwardRef(() => MaintenanceModule),
    forwardRef(() => ProjectEditModule),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, SendMailService],
  exports: [ProjectService],
})
export class ProjectModule {}
