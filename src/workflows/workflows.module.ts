import { Module } from '@nestjs/common'
import { WorkflowsService } from './workflows.service'
import { WorkflowsController } from './workflows.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Workflow } from './entities/workflow.entity'
import { StepsModule } from 'src/steps/steps.module'
import { WorkflowStepsModule } from 'src/workflow_steps/workflow_steps.module'
import { ProjectStepsModule } from 'src/project_steps/project_steps.module'
import { DepartmensModule } from 'src/departmens/departmens.module'
@Module({
  imports: [TypeOrmModule.forFeature([Workflow]), StepsModule, WorkflowStepsModule,ProjectStepsModule,DepartmensModule],
  controllers: [WorkflowsController],
  providers: [WorkflowsService],
  exports: [WorkflowsService],
})
export class WorkflowsModule {}
