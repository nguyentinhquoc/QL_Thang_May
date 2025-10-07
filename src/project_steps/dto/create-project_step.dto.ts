import { IsNotEmpty, IsInt, Max, Min } from 'class-validator'
import { Project } from 'src/project/entities/project.entity'
import { Staff } from 'src/staffs/entities/staff.entity'
import { WorkflowStep } from 'src/workflow_steps/entities/workflow_step.entity'

import { W } from 'typeorm'
export class CreateProjectStepDto {
  @IsInt({message: 'Bước quy trình phải là số nguyên'})
  @IsNotEmpty({message: 'Bước quy trình không được để trống'})
  workflowStep: WorkflowStep
  @IsInt({message: 'Dự án phải là số nguyên'})
  @IsNotEmpty({message: 'Dự án không được để trống'})
  project: Project
  staff?: Staff
  weight?: number
}
