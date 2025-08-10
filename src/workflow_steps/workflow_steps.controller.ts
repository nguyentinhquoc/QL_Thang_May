import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { WorkflowStepsService } from './workflow_steps.service'
import { CreateWorkflowStepDto } from './dto/create-workflow_step.dto'
import { UpdateWorkflowStepDto } from './dto/update-workflow_step.dto'
@Controller('workflow-steps')
export class WorkflowStepsController {
  constructor (private readonly workflowStepsService: WorkflowStepsService) {}
}
