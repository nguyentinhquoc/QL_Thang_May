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
    private departmentsStepRepository: Repository<DepartmentsStep>
  ) {}
  async create (createDepartmentsStepDto: CreateDepartmentsStepDto) {
    return await this.departmentsStepRepository.save(createDepartmentsStepDto)
  }


  findByStep (stepId: number) {
    return this.departmentsStepRepository.find({
      where: { step: { id: stepId } },
      relations: ['department']
    })
  }
  findOneByStepADepartment (stepId: number, departmentId: number) {
    return this.departmentsStepRepository.findOne({
      where: { step: { id: stepId } , department: { id: departmentId } },
    })
  }
  removeByStepAndDepartment(stepId: number, departmentId: number) {
    return this.departmentsStepRepository.delete({
      step: { id: stepId },
      department: { id: departmentId }
    })
  }

  findAll () {
    return `This action returns all departmentsSteps`
  }

  findOne (id: number) {
    return `This action returns a #${id} departmentsStep`
  }

  update (id: number, updateDepartmentsStepDto: UpdateDepartmentsStepDto) {
      return this.departmentsStepRepository.update(id, updateDepartmentsStepDto)
  }

  remove (id: number) {
    return `This action removes a #${id} departmentsStep`
  }
}
