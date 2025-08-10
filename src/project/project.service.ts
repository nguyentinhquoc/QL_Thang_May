import {Injectable} from '@nestjs/common'
import {CreateProjectDto, CreateProjectMaintenanceDto} from './dto/create-project.dto'
import {UpdateProjectDto} from './dto/update-project.dto'
import {InjectRepository} from '@nestjs/typeorm'
import {Project} from './entities/project.entity'
import {LessThan, MoreThan, Not, Repository} from 'typeorm'
import {relative} from 'path'
import {HistoryMaintenance} from 'src/history-maintenance/entities/history-maintenance.entity'
@Injectable()
export class ProjectService {
  constructor (
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(HistoryMaintenance)
    private readonly historyMaintenanceRepository: Repository<HistoryMaintenance>,
  ) {}





  async statisticalMaintenance () {
    const toDay = new Date()
    // lấy ra project dạng bảo trì mất phí
    // const projects = await this.projectRepository
    //   .createQueryBuilder('project')
    //   .leftJoinAndSelect('project.historyMaintenance', 'history')
    //   .where('project.type = :type', {type: 'BAOTRI'})
    //   .andWhere('history.timeStart < :toDay', {toDay})
    //   .andWhere('history.timeEnd > :toDay', {toDay})
    //   .andWhere('history.free = :free', {free: false})
    //   .getMany()
    const projects = await this.historyMaintenanceRepository.find({
      where: {
        timeStart: LessThan(toDay),
        timeEnd: MoreThan(toDay),
        free: false,
      },
      relations: ['project'],
    })
     const objData = {
       quangNinh: 0,
       haNoi: 0,
       khac: 0,
       tong: 0,
     }
     projects.forEach((element) => {
       if (element.project.address.toUpperCase().includes('QUẢNG NINH')) {
         objData.quangNinh += 1
         objData.tong += 1
       } else if (element.project.address.toUpperCase().includes('HÀ NỘI')) {
         objData.haNoi += 1
         objData.tong += 1
       } else {
         objData.khac += 1
         objData.tong += 1
       }
     })
     return objData
  }
  async statisticalMaintenanceFree () {
    const toDay = new Date()
    const project = await this.historyMaintenanceRepository.find({
      where: {
        timeStart: LessThan(toDay),
        timeEnd: MoreThan(toDay),
        free: true,
      },
      relations: ['project'],
    })
    const objData = {
      quangNinh: 0,
      haNoi: 0,
      khac: 0,
      tong: 0,
    }
    project.forEach((element) => {
      if (element.project.address.toUpperCase().includes('QUẢNG NINH')) {
        objData.quangNinh += 1
        objData.tong += 1
      } else if (element.project.address.toUpperCase().includes('HÀ NỘI')) {
        objData.haNoi += 1
        objData.tong += 1
      } else {
        objData.khac += 1
        objData.tong += 1
      }
    })
    return objData
  }
  async statisticalWarranty () {
    const toDay = new Date()
    const project = await this.projectRepository.find({
      where: {
        warrantyStart: LessThan(toDay),
        warrantyEnd: MoreThan(toDay),
      },
    })
    const objData = {
      quangNinh: 0,
      haNoi: 0,
      khac: 0,
      tong: 0,
    }
    project.forEach((element) => {
      if (element.address.toUpperCase().includes('QUẢNG NINH')) {
        objData.quangNinh += 1
        objData.tong += 1
      } else if (element.address.toUpperCase().includes('HÀ NỘI')) {
        objData.haNoi += 1
        objData.tong += 1
      } else {
        objData.khac += 1
        objData.tong += 1
      }
    })
    return objData
  }

  async findAllProject () {
    const project = await this.projectRepository.find({
      relations: ['historyMaintenance'],
    })
    return project
  }

  async countProjectByMonth () {
    const projects = await this.projectRepository.find()
    // Đếm số lượng dự án và tính tổng giá trị (price - tax) theo tháng
    const monthlyCount = {}
    projects.forEach((project) => {
      const month = new Date(project.createdAt).getMonth() + 1 // Tháng bắt đầu từ 0 nên cần cộng thêm 1
      const year = new Date(project.createdAt).getFullYear()
      const key = `${year}-${month}`
      // Tính tổng (price - tax) cho dự án
      const price = Number(project.price) // Chắc chắn là số, chuyển từ chuỗi nếu cần
      const tax = Number(project.tax) // Chắc chắn là số, chuyển từ chuỗi nếu cần
      const totalValue = price - tax
      if (monthlyCount[key]) {
        monthlyCount[key].count++
        monthlyCount[key].totalValue += totalValue // Cộng dồn tổng giá trị cho tháng
      } else {
        monthlyCount[key] = {
          count: 1, // Số lượng dự án
          totalValue: totalValue, // Tổng giá trị (price - tax)
        }
      }
    })
    // Chuyển kết quả thành mảng và sắp xếp theo tháng/năm
    const result = Object.keys(monthlyCount).map((key) => {
      const [year, month] = key.split('-')
      return {
        year: parseInt(year),
        month: parseInt(month),
        count: monthlyCount[key].count,
        totalValue: monthlyCount[key].totalValue, // Thêm tổng giá trị vào kết quả
      }
    })
    result.sort((a, b) => {
      if (a.year === b.year) {
        return a.month - b.month
      }
      return a.year - b.year
    })
    return result
  }
  async countProjectByMonthByBusines (idStaff: number) {
    const projects = await this.projectRepository.find({
      where: {
        projectStaff: {
          staff: {
            id: idStaff,
          },
        },
      },
    })
    const monthlyCount = {}
    projects.forEach((project) => {
      const month = new Date(project.createdAt).getMonth() + 1 // Tháng bắt đầu từ 0 nên cần cộng thêm 1
      const year = new Date(project.createdAt).getFullYear()
      const key = `${year}-${month}`
      // Tính tổng (price - tax) cho dự án
      const price = Number(project.price) // Chắc chắn là số, chuyển từ chuỗi nếu cần
      const tax = Number(project.tax) // Chắc chắn là số, chuyển từ chuỗi nếu cần
      const totalValue = price - tax
      if (monthlyCount[key]) {
        monthlyCount[key].count++
        monthlyCount[key].totalValue += totalValue // Cộng dồn tổng giá trị cho tháng
      } else {
        monthlyCount[key] = {
          count: 1, // Số lượng dự án
          totalValue: totalValue, // Tổng giá trị (price - tax)
        }
      }
    })
    // Chuyển kết quả thành mảng và sắp xếp theo tháng/năm
    const result = Object.keys(monthlyCount).map((key) => {
      const [year, month] = key.split('-')
      return {
        year: parseInt(year),
        month: parseInt(month),
        count: monthlyCount[key].count,
        totalValue: monthlyCount[key].totalValue, // Thêm tổng giá trị vào kết quả
      }
    })

    result.sort((a, b) => {
      if (a.year === b.year) {
        return a.month - b.month
      }
      return a.year - b.year
    })

    return result
  }

  create (createProjectDto: CreateProjectDto) {
    try {
      return this.projectRepository.save({
        code_project: createProjectDto.code_project,
        full_name: createProjectDto.full_name,
        tax: createProjectDto.tax,
        price: createProjectDto.price,
        number_phone: createProjectDto.number_phone,
        email: createProjectDto.email,
        address: createProjectDto.address,
        infor_product: createProjectDto.infor_product,
      })
    } catch (error) {
      console.log('🔴 ~ file: project.service.ts ~ line 116 ~ ProjectService ~ create ~ error', error)
    }
  }
  createProjectMaintenance (createProjectMaintenanceDto: CreateProjectMaintenanceDto) {
    try {
      return this.projectRepository.save({
        code_project: createProjectMaintenanceDto.code_project,
        full_name: createProjectMaintenanceDto.full_name,
        tax: createProjectMaintenanceDto.tax,
        price: createProjectMaintenanceDto.price,
        number_phone: createProjectMaintenanceDto.number_phone,
        email: createProjectMaintenanceDto.email,
        address: createProjectMaintenanceDto.address,
        infor_product: createProjectMaintenanceDto.infor_product,
        type: 'BAOTRI',
      })
    } catch (error) {
      console.log('🔴 ~ file: project.service.ts ~ line 116 ~ ProjectService ~ create ~ error', error)
    }
  }
  findAll () {
    return this.projectRepository.find({
      relations: ['projectStaff', 'projectStaff.staff', 'projectSteps', 'projectSteps.staff'],
    })
  }
  findAllByBusines (idStaff: number) {
    return this.projectRepository.find({
      where: {
        projectStaff: {
          staff: {
            id: idStaff,
          },
        },
      },
      relations: ['projectStaff', 'projectStaff.staff', 'projectSteps', 'projectSteps.staff'],
    })
  }

  findAllStatus (status: number) {
    if (status == 2) {
      return this.projectRepository.find({
        where: {type: 'LAPDAT'},
        relations: ['projectStaff', 'projectStaff.staff', 'projectSteps', 'projectSteps.staff'],
      })
    } else {
      return this.projectRepository.find({
        where: {status, type: 'LAPDAT'},
        relations: ['projectStaff', 'projectStaff.staff', 'projectSteps', 'projectSteps.staff'],
      })
    }
  }

  findAllProjectsMaintennce () {
    return this.projectRepository.find({
      where: {type: 'BAOTRI'},
      relations: ['projectStaff', 'projectStaff.staff', 'projectSteps', 'projectSteps.staff'],
    })
  }

  findByStaffId (staffId: number, status: number) {
    if (status == 2) {
      return this.projectRepository.find({
        where: {
          type: 'LAPDAT',
          projectStaff: {
            staff: {
              id: staffId,
            },
          },
        },
        relations: ['projectStaff', 'projectStaff.staff', 'projectSteps', 'projectSteps.staff'],
      })
    } else {
      return this.projectRepository.find({
        where: {
          type: 'LAPDAT',
          projectStaff: {
            staff: {
              id: staffId,
            },
          },
          status,
        },
        relations: ['projectStaff', 'projectStaff.staff', 'projectSteps', 'projectSteps.staff'],
      })
    }
  }
  findProjectsMaintennceByStaffId (staffId: number) {
    return this.projectRepository.find({
      where: {
        type: 'BAOTRI',
        projectStaff: {
          staff: {
            id: staffId,
          },
        },
      },
      relations: ['projectStaff', 'projectStaff.staff', 'projectSteps', 'projectSteps.staff'],
    })
  }

  findAllAction () {
    return this.projectRepository.find({
      where: {status: 0},
      relations: ['projectStaff', 'projectStaff.staff', 'projectSteps'],
    })
  }
  findAlSuccess () {
    return this.projectRepository.find({
      where: {status: 1},
      relations: ['projectStaff', 'projectStaff.staff', 'projectSteps'],
    })
  }
  findOne (id: number) {
    return this.projectRepository.findOne({
      where: {id},
      relations: ['projectStaff', 'projectStaff.staff'],
    })
  }
  update (id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectRepository.update(id, updateProjectDto)
  }
  async updateStatusProject (id: number) {
    return await this.projectRepository.update(id, {status: 1})
  }
  remove (id: number) {
    return `This action removes a #${id} project`
  }
}
