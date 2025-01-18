import { Project } from './../project/entities/project.entity'
import { MaintenanceAction } from 'src/maintenance_actions/entities/maintenance_action.entity'
import { Injectable } from '@nestjs/common'
import { CreateProjectStepDto } from './dto/create-project_step.dto'
import { UpdateProjectStepDto } from './dto/update-project_step.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Not, Repository } from 'typeorm'
import { ProjectStep } from './entities/project_step.entity'
import { WorkflowStep } from 'src/workflow_steps/entities/workflow_step.entity'
import { Staff } from 'src/staffs/entities/staff.entity'
@Injectable()
export class ProjectStepsService {
  constructor (
    @InjectRepository(ProjectStep)
    private projectStepRepository: Repository<ProjectStep>,
  ) {}
  create (createProjectStepDto: CreateProjectStepDto) {
    return this.projectStepRepository.save(createProjectStepDto)
  }
  async findOneWWorkflows (workflowsId: number): Promise<ProjectStep[]> {
    return await this.projectStepRepository
      .createQueryBuilder('projectStep')
      .innerJoinAndSelect('projectStep.workflowStep', 'workflowStep')
      .innerJoinAndSelect('workflowStep.workflow', 'workflow')
      .where('workflow.id = :workflowsId', { workflowsId })
      .getMany()
  }

  findByProject (projectId: number) {
    return this.projectStepRepository.find({
      where: {
        project: {
          id: projectId,
        },
        staff: {
          id: Not(0),
        },
      },
    })
  }
  findWworkflowStepAProject (workflowStepId:number, projectId:number) {
    return this.projectStepRepository.find({
      where: {
        workflowStep: {
          id: workflowStepId,
        },
        project: {
          id: projectId,
        },
      },
    })
  }
  update (where: object, data: object) {
    return this.projectStepRepository.update(where, data)
  }

  findWdataUpdate (staffId, workflowStepId, projectId) {
    return this.projectStepRepository.find({
      where: {
        staff: {
          id: staffId,
        },
        workflowStep: {
          id: workflowStepId,
        },
        project: {
          id: projectId,
        },
      },
    })
  }
  async findWProject (id: number) {
    return await this.projectStepRepository.find({
      where: {
        project: {
          id: id,
        },
      },
    })
  }
  async findWProjectAStatus (id: number) {
    const query = await this.projectStepRepository
      .createQueryBuilder('projectStep')
      .leftJoinAndSelect('projectStep.project', 'project')
      .where('project.id = :id', { id })
      .andWhere('projectStep.status IS NULL')
      .getMany()
    return query
  }
  findOne (id: number) {
    return this.projectStepRepository.findOne({
      where: { id },
      relations: ['staff', 'project', 'workflowStep.step'],
    })
  }
  async findProject (id: number) {
    const projectSteps = await this.projectStepRepository.find({
      where: {
        project: {
          id: id,
        },
      },
      relations: [
        'workflowStep',
        'project',
        'staff',
        'workflowStep.step',
        'workflowStep.workflow',
      ],
    })
    projectSteps.sort((a, b) => {
      const workflowStepA = a.workflowStep
      const workflowStepB = b.workflowStep
      if (workflowStepA && workflowStepB) {
        return workflowStepA.id - workflowStepB.id
      }
      return 0
    })
    return projectSteps.map(projectStep => {
      const { workflowStep } = projectStep
      const step = workflowStep ? workflowStep.step : null
      const workflow = workflowStep ? workflowStep.workflow : null
      return {
        ...projectStep,
        step,
        workflow,
      }
    })
  }

  findDataWIdStaff (id: number) {
    return this.projectStepRepository.find({
      where: {
        staff: {
          id: id,
        },
      },
      order: {
        status: 'ASC',
        createdAt: 'DESC',
      },
      relations: [
        'workflowStep',
        'project',
        'workflowStep.step',
        'workflowStep.workflow',
      ],
    })
  }
  async findWWorkflowStepsStaffProject (
    project: Project,
    workflowStep: WorkflowStep,
    staff: Staff,
  ): Promise<any | undefined> {
    const projectQuery = {
      id: project.id,
      full_name: project.full_name,
      number_phone: project.number_phone,
      email: project.email,
      address: project.address,
      description: project.description,
      status: project.status,
    }
    const value = await this.projectStepRepository.find({
      where: {
        project: projectQuery,
        workflowStep: { id: workflowStep.id },
        staff: { id: staff.id },
      },
    })
    return value
  }
  async removeProjectSteps (project: Project): Promise<void> {
    await this.projectStepRepository.delete({ project: { id: project.id } })
  }
  async findWStaffAWeightNull (workflowStep: WorkflowStep, project: Project) {
    return await this.projectStepRepository.find({
      where: {
        workflowStep: { id: workflowStep.id },
        project: { id: project.id },
        weight: IsNull(),
        staff: IsNull(),
      },
    })
  }

  async delete (id: number): Promise<void> {
    await this.projectStepRepository.delete(id)
  }
  async updateStatusWProjectAWorkflowSteps (
    image: string,
    feedback: string,
    staff: object,
    project: object,
    workflowStep: object,
  ) {
    await this.projectStepRepository.update(
      { project, workflowStep, staff },
      {
        status: new Date(),
        image,
        feedback,
      },
    )
  }
}
