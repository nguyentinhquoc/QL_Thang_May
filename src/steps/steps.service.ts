import { Injectable } from '@nestjs/common'
import { CreateStepDto } from './dto/create-step.dto'
import { UpdateStepDto } from './dto/update-step.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Step } from './entities/step.entity'
import { Repository } from 'typeorm'
@Injectable()
export class StepsService {
  constructor (
    @InjectRepository(Step)
    private stepsRepository: Repository<Step>
  ) {}
  async create (createStepDto: CreateStepDto) {
    return await this.stepsRepository.save(createStepDto)
  }
  findAll () {
    return this.stepsRepository.find({
      relations: ['departmentsSteps', 'departmentsSteps.department']
    })
  }
  findOne (id: number) {
    return this.stepsRepository.findOne({
      where: { id },
      relations: ['departmentsSteps', 'departmentsSteps.department']
    })
  }
  async update (id: number, updateStepDto: UpdateStepDto) {
    return await this.stepsRepository.update(id, {
      name: updateStepDto.name,
      description: updateStepDto.description
    })
  }

}
