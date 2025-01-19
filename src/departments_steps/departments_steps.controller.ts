import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { DepartmentsStepsService } from './departments_steps.service'
import { CreateDepartmentsStepDto } from './dto/create-departments_step.dto'
import { UpdateDepartmentsStepDto } from './dto/update-departments_step.dto'

@Controller('departments-steps')
export class DepartmentsStepsController {
  constructor (
    private readonly departmentsStepsService: DepartmentsStepsService,
  ) {}

  @Post()
  create (@Body() createDepartmentsStepDto: CreateDepartmentsStepDto) {
    return this.departmentsStepsService.create(createDepartmentsStepDto)
  }

  @Get()
  findAll () {
    return this.departmentsStepsService.findAll()
  }

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.departmentsStepsService.findOne(+id)
  }

  @Patch(':id')
  update (
    @Param('id') id: string,
    @Body() updateDepartmentsStepDto: UpdateDepartmentsStepDto,
  ) {
    return this.departmentsStepsService.update(+id, updateDepartmentsStepDto)
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.departmentsStepsService.remove(+id)
  }
}
