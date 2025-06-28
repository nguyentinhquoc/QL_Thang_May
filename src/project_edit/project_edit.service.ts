import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateProjectEditDto } from './dto/create-project_edit.dto'
import { UpdateProjectEditDto } from './dto/update-project_edit.dto'
import { ProjectEdit } from './entities/project_edit.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
@Injectable()
export class ProjectEditService {
  constructor (
    @InjectRepository(ProjectEdit)
    private readonly projectEditRepository: Repository<ProjectEdit>
  ) {}
  async create (createProjectEditDto: CreateProjectEditDto) {
    return await this.projectEditRepository.save({
      code_project: createProjectEditDto.code_project,
      price: createProjectEditDto.price,
      tax: createProjectEditDto.tax,
      full_name: createProjectEditDto.full_name,
      number_phone: createProjectEditDto.number_phone,
      email: createProjectEditDto.email,
      address: createProjectEditDto.address,
      description: createProjectEditDto.description,
      staff: createProjectEditDto.staff,
      project: createProjectEditDto.project,
      infor_product: createProjectEditDto.infor_product
    })
  }
  async findAll () {
    return await this.projectEditRepository.find({
      relations: ['staff', 'project'],
      order: {
        createdAt: 'DESC'
      }
    })
  }



  async findProjectEditByBusines (idStaff: number) {
    return await this.projectEditRepository.find({
      where: {
      project: {
        projectStaff: {
        staff: {
          id: idStaff
        }
        }
      }
      },
      relations: ['staff', 'project', 'project.projectStaff', 'project.projectStaff.staff'],
      order: {
      createdAt: 'DESC'
      }
    })
  }

  findOne (id: number) {
    return this.projectEditRepository.findOne({
      where: { id },
      relations: ['staff', 'project']
    })
  }
async remove(id: number) {
  const projectEdit = await this.projectEditRepository.findOne({
    where: { id }
  });
  if (!projectEdit) {
    throw new NotFoundException('Project edit not found');
  }
  return await this.projectEditRepository.remove(projectEdit);
}

}
