import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  SetMetadata,
} from '@nestjs/common'
import { StepsService } from './steps.service'
import { CreateStepDto } from './dto/create-step.dto'
import { UpdateStepDto } from './dto/update-step.dto'
import { Response } from 'express'
import { DepartmensService } from 'src/departmens/departmens.service'
import { DepartmentsStepsService } from 'src/departments_steps/departments_steps.service'
import { CreateDepartmentsStepDto } from 'src/departments_steps/dto/create-departments_step.dto'
@Controller('steps')
export class StepsController {
  constructor(
    private readonly stepsService: StepsService,
    private departmensService: DepartmensService,
    private departmentsStepsService: DepartmentsStepsService,
  ) {}
  @Post()
  @SetMetadata('role_admin', true)
  async create(@Body() createStepDto: CreateStepDto, @Res() res: Response) {
    await this.stepsService.create(createStepDto)
    if (createStepDto.department.length > 0) {
      for (const department of createStepDto.department) {
        let stepCreate = await this.stepsService.findOne(createStepDto.id)
        let departmentCreate = await this.departmensService.findOne(+department)
        if (departmentCreate && stepCreate) {
          const createDepartmentsStepDto = new CreateDepartmentsStepDto()
          createDepartmentsStepDto.department = departmentCreate
          createDepartmentsStepDto.step = stepCreate
          await this.departmentsStepsService.create(createDepartmentsStepDto)
        }
      }
    }
    return res.redirect('back')
  }
  @Get()
  @SetMetadata('role_admin', true)
  findAll() {
    return this.stepsService.findAll()
  }
  @Get(':id')
  @SetMetadata('role_admin', true)
  findOne(@Param('id') id: string) {
    return this.stepsService.findOne(+id)
  }
  @Patch(':id')
  @SetMetadata('role_admin', true)
  update(@Param('id') id: string, @Body() updateStepDto: UpdateStepDto) {
    return this.stepsService.update(+id, updateStepDto)
  }
  @Delete(':id')
  @SetMetadata('role_admin', true)
  remove(@Param('id') id: string) {
    return this.stepsService.remove(+id)
  }
}