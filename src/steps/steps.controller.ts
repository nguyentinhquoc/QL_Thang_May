import { Controller, Post, Body, Patch, Param, Res, SetMetadata } from '@nestjs/common';
import {StepsService} from './steps.service'
import {CreateStepDto} from './dto/create-step.dto'
import {UpdateStepDto} from './dto/update-step.dto'
import {Response} from 'express'
import {DepartmensService} from 'src/departmens/departmens.service'
import {DepartmentsStepsService} from 'src/departments_steps/departments_steps.service'
import {CreateDepartmentsStepDto} from 'src/departments_steps/dto/create-departments_step.dto'
@Controller('steps')
export class StepsController {
  constructor (
    private readonly stepsService: StepsService,
    private departmensService: DepartmensService,
    private departmentsStepsService: DepartmentsStepsService,
  ) {}
  @Post()
  async create (@Body() createStepDto: CreateStepDto, @Res() res: Response) {
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
  @Patch(':id')
  async update (@Param('id') id: string, @Body() updateStepDto: UpdateStepDto) {
    let departmentNew: number[] = updateStepDto.department || []
    let findByStep = await this.departmentsStepsService.findByStep(+id)
    let idDepartmentOld: number[] = findByStep.map((item) => +item.department.id)
    departmentNew = departmentNew.map((item) => +item)
    idDepartmentOld = idDepartmentOld.map((item) => +item)
    if (departmentNew.length - idDepartmentOld.length > 0) {
      let departmentAdd = departmentNew.filter((item) => !idDepartmentOld.includes(item))
      for (const department of departmentAdd) {
        let stepCreate = await this.stepsService.findOne(+id)
        let departmentCreate = await this.departmensService.findOne(+department)
        if (departmentCreate && stepCreate) {
          const createDepartmentsStepDto = new CreateDepartmentsStepDto()
          createDepartmentsStepDto.department = departmentCreate
          createDepartmentsStepDto.step = stepCreate
          await this.departmentsStepsService.create(createDepartmentsStepDto)
        }
      }
    } else if (departmentNew.length - idDepartmentOld.length < 0) {
      let departmentRemove = idDepartmentOld.filter((item) => !departmentNew.includes(item))
      for (const department of departmentRemove) {
        await this.departmentsStepsService.removeByStepAndDepartment(+id, department)
      }
    } else if (departmentNew.length - idDepartmentOld.length == 0) {
      for (let index = 0; index < idDepartmentOld.length; index++) {
        const departmentOld = await this.departmensService.findOne(idDepartmentOld[index])
        const idDepartmentStep = await this.departmentsStepsService.findOneByStepADepartment(+id, +departmentOld.id)
        const department = await this.departmensService.findOne(departmentNew[index])
        await this.departmentsStepsService.update(+idDepartmentStep.id, {
          department,
        })
      }
    }
    return this.stepsService.update(+id, updateStepDto)
  }
}
