import { IsNotEmpty, IsInt, Max, Min } from 'class-validator'
import { Project } from 'src/project/entities/project.entity'
import { Staff } from 'src/staffs/entities/staff.entity'
import { WorkflowStep } from 'src/workflow_steps/entities/workflow_step.entity'

import { W } from 'typeorm'
export class CreateProjectStepDto {
  @IsInt()
  @IsNotEmpty()
  workflowStep: WorkflowStep
  @IsInt()
  @IsNotEmpty()
  project: Project
  staff?: Staff
  weight?: number
}
