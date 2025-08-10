import { Injectable } from '@nestjs/common'
import { CreateProjectStaffDto } from './dto/create-project_staff.dto'
import { UpdateProjectStaffDto } from './dto/update-project_staff.dto'
import { Repository } from 'typeorm'
import { ProjectStaff } from './entities/project_staff.entity'
import { InjectRepository } from '@nestjs/typeorm'
@Injectable()
export class ProjectStaffService {
  constructor (
    @InjectRepository(ProjectStaff)
    private projectStaffRepository: Repository<ProjectStaff>,
  ) {}
  create (createProjectStaffDto: CreateProjectStaffDto) {
    return this.projectStaffRepository.save(createProjectStaffDto)
  }

  async findProjectStaffByMonth (idStaff: number) {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1
    const inforStaffs = await this.projectStaffRepository.find({
      where: { staff: { id: idStaff } },
      relations: ['staff', 'project'],
    })
    if (!inforStaffs || inforStaffs.length === 0) {
      return { staffId: idStaff, monthlyDetails: [] }
    }
    const earliestDate = inforStaffs.reduce((earliest, projectStaff) => {
      const projectStaffDate = new Date(projectStaff.createdAt)
      return projectStaffDate < earliest ? projectStaffDate : earliest
    }, new Date())

    const startYear = earliestDate.getFullYear()
    const startMonth = earliestDate.getMonth() + 1
    const monthlyDetails = []
    for (let year = startYear; year <= currentYear; year++) {
      const start = year === startYear ? startMonth : 1
      const end = year === currentYear ? currentMonth : 12

      for (let month = start; month <= end; month++) {
        monthlyDetails.push({ year, month, count: 0 })
      }
    }
    inforStaffs.forEach(projectStaff => {
      const projectStaffDate = new Date(projectStaff.createdAt)
      const projectYear = projectStaffDate.getFullYear()
      const projectMonth = projectStaffDate.getMonth() + 1
      const projectInfo = projectStaff.project
      const monthDetail = monthlyDetails.find(
        m => m.year === projectYear && m.month === projectMonth,
      )
      if (monthDetail) {
        monthDetail.count += 1
      }
      monthDetail.projects = monthDetail.projects || []
      monthDetail.projects.push({
        projectId: projectInfo.id,
        projectName: projectInfo.full_name,
        projectCode: projectInfo.code_project,
        projectStatus: projectInfo.status,
      })
    })
    monthlyDetails.reverse()
    return {
      staffId: idStaff,
      monthlyDetails,
    }
  }

  async findAllList () {
    const result = await this.projectStaffRepository
      .createQueryBuilder('projectStaff')
      .leftJoinAndSelect('projectStaff.staff', 'staff')
      .leftJoinAndSelect('projectStaff.project', 'project')
      .select('staff.id', 'staffId')
      .addSelect('staff.full_name', 'staffName')
      .addSelect('COUNT(project.id)', 'totalProjects')
      .groupBy('staff.id')
      .addGroupBy('staff.full_name')
      .getRawMany()
    return result
  }

  findWStaff (idStaff: number) {
    return this.projectStaffRepository.find({
      where: { staff: { id: idStaff } },
      relations: [
        'staff',
        'project',
        'project.projectSteps',
        'project.projectSteps.staff',
      ],
    })
  }
  findWStaffAProject (idStaff: number, idProject: number) {
    return this.projectStaffRepository.find({
      where: { staff: { id: idStaff }, project: { id: idProject } },
      relations: ['staff', 'project'],
    })
  }

  remove (id: number) {
    return this.projectStaffRepository.delete(+id)
  }
}
