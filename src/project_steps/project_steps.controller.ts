import { ProjectStepsService } from './project_steps.service';
import { CreateProjectStepDto } from './dto/create-project_step.dto';
import { UpdateProjectStepDto } from './dto/update-project_step.dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
@Controller('project-steps')
export class ProjectStepsController {
  constructor(private readonly projectStepsService: ProjectStepsService) {}
}
