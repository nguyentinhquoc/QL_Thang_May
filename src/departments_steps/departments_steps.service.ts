import { Injectable } from '@nestjs/common'
import { CreateDepartmentsStepDto } from './dto/create-departments_step.dto'
import { UpdateDepartmentsStepDto } from './dto/update-departments_step.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DepartmentsStep } from './entities/departments_step.entity'

@Injectable()
export class DepartmentsStepsService {
  constructor (
    @InjectRepository(DepartmentsStep)
    private departmentsStepRepository: Repository<DepartmentsStep>,
  ) {}
  async create (createDepartmentsStepDto: CreateDepartmentsStepDto) {
    return await this.departmentsStepRepository.save(createDepartmentsStepDto)
  }

  findAll () {
    return `This action returns all departmentsSteps`
  }

  findOne (id: number) {
    return `This action returns a #${id} departmentsStep`
  }

  update (id: number, updateDepartmentsStepDto: UpdateDepartmentsStepDto) {
    return `This action updates a #${id} departmentsStep`
  }

  remove (id: number) {
    return `This action removes a #${id} departmentsStep`
  }
}
