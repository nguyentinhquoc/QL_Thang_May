import { Injectable } from '@nestjs/common'
import { CreateStaffDto } from './dto/create-staff.dto'
import { UpdateStaffDto } from './dto/update-staff.dto'
import { Staff } from './entities/staff.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/create-staff-logindto'
import { JwtService } from '@nestjs/jwt'
import { relative } from 'path'
@Injectable()
export class StaffsService {
  constructor (
    @InjectRepository(Staff)
    private staffsRepository: Repository<Staff>,
    private jwtService: JwtService
  ) {}
  findPayrollWStaff (staffId: number) {
    return this.staffsRepository.findOne({
      where: {
        id: staffId
      },
      relations: [
        'projectSteps',
        'projectSteps.workflowStep.step',
        'projectSteps.project',
        'maintenanceActions',
        'maintenanceActions.maintenance',
        'maintenanceActions.maintenance.project'
      ]
    })
  }
  async create (
    createStaffDto: CreateStaffDto,
    password: string
  ): Promise<Staff> {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const createStaffDtohash = this.staffsRepository.create({
      ...createStaffDto,
      password: hashedPassword
    })
    return this.staffsRepository.save(createStaffDtohash)
  }
  async findAll () {
    return this.staffsRepository.find({
      order: {
        status: 'DESC'
      },
      relations: ['department', 'position']
    })
  }
  async findAllPayroll () {
    const staffs = await this.staffsRepository.find({
      order: { status: 'DESC' },
      relations: ['projectSteps', 'maintenanceActions']
    })

    const results = staffs.map(staff => {
      // Tính số lượng ongoingTasks
      const ongoingTasks =
        staff.projectSteps.filter(step => step.status == null).length +
        staff.maintenanceActions.filter(action => action.status == null).length

      // Tính số lượng completedTasks
      const completedTasks =
        staff.projectSteps.filter(step => step.status !== null).length +
        staff.maintenanceActions.filter(action => action.status !== null).length

      // Tổng số task
      const totalTasks = ongoingTasks + completedTasks

      return {
        staff,
        ongoingTasks,
        completedTasks,
        totalTasks
      }
    })

    return results
  }

  findOne (id: number) {
    return this.staffsRepository.findOne({
      where: { id },
      relations: ['department', 'position']
    })
  }
  findOnew (email: string) {
    return this.staffsRepository.findOne({ where: { email } })
  }
  async login (loginDto: LoginDto) {
    const staff = await this.staffsRepository.findOne({
      where: { email: loginDto.email, status: true },
      relations: ['department', 'position']
    })
    if (!staff) {
      return false
    }
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      staff.password
    )
    if (!isPasswordValid) {
      return false
    }
    const payload = {
      email: staff.email,
      id: staff.id,
      role_admin: staff.role_admin,
      full_name: staff.full_name,
      avatar: staff.avatar,
      manager: staff.position.id === 1,
      busines: staff.department.id === 1
    }
    const token = this.createToken(payload)
    return token
  }
  async createToken (payload: any) {
    const token = this.jwtService.sign(payload)
    return token
  }
  async payload (token: string) {
    const payload = await this.jwtService.verify(token)
    return payload
  }
  async update (id: number, updateStaffDto: UpdateStaffDto) {
    if (updateStaffDto.password) {
      const saltRounds = 10
      updateStaffDto.password = await bcrypt.hash(
        updateStaffDto.password,
        saltRounds
      )
    }
    await this.staffsRepository.update(id, updateStaffDto)
  }
  remove (id: number) {
    return this.staffsRepository.softDelete(id)
  }
  async changeStatus (id: number) {
    const staff = await this.staffsRepository.findOne({ where: { id } })
    if (staff) {
      const newStatus = !staff.status
      await this.staffsRepository.update(id, { status: newStatus })
    }
  }
  async findAllBusines () {
    const currentYear = new Date().getFullYear()
    const staffs = await this.staffsRepository.find({
      where: { department: { id: 1 } },
      relations: ['projectStaff', 'targetBusine', 'department']
    })
    const result = staffs.map(staff => {
      const currentYearTargets = staff.targetBusine
        ? staff.targetBusine.filter(target => target.year === currentYear)
        : []
      const totalTarget = currentYearTargets.reduce(
        (sum, target) => sum + (target.target || 0),
        0
      )
      return {
        ...staff,
        totalProjectStaff: staff.projectStaff ? staff.projectStaff.length : 0,
        totalTarget
      }
    })
    return result
  }
}
