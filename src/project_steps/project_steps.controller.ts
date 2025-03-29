import { ProjectStepsService } from './project_steps.service';
import { CreateProjectStepDto } from './dto/create-project_step.dto';
import { UpdateProjectStepDto } from './dto/update-project_step.dto';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
@Controller('project-steps')
export class ProjectStepsController {
  constructor(private readonly projectStepsService: ProjectStepsService) {}
  @Post()
  create(@Body() createProjectStepDto: CreateProjectStepDto) {
    return this.projectStepsService.create(createProjectStepDto);
  }
  @Get()
  findAll() {
    // return this.projectStepsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectStepsService.findOne(+id);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    // return this.projectStepsService.remove);
  }
}
