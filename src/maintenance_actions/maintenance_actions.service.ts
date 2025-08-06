import { Injectable } from '@nestjs/common'
import { CreateMaintenanceActionDto } from './dto/create-maintenance_action.dto'
import { UpdateMaintenanceActionDto } from './dto/update-maintenance_action.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { MaintenanceAction } from './entities/maintenance_action.entity'
import { Repository } from 'typeorm'
@Injectable()
export class MaintenanceActionsService {
  constructor (
    @InjectRepository(MaintenanceAction)
    private readonly maintenanceActionRepository: Repository<MaintenanceAction>,
  ) {}
  async create (createMaintenanceActionDto: CreateMaintenanceActionDto) {
    return await this.maintenanceActionRepository.save(
      createMaintenanceActionDto,
    )
  }
  findAll () {
    return this.maintenanceActionRepository.find({
      where: {
        //  confirmSuccess: true

       },
    })
  }
  findProject (id: number) {
    return this.maintenanceActionRepository.find({
      where: {
        // confirmSuccess: true,
        maintenance: {
          project: {
            id: id,
          },
        },
      },
      relations: ['maintenance', 'maintenance.project', 'staff'],
    })
  }
  async findAllWStaff (id: number) {
    return await this.maintenanceActionRepository.find({
      where: {
        // confirmSuccess: true,
        staff: {
          id,
        },
      },
      relations: ['staff', 'maintenance', 'maintenance.project'],
    })
  }

  update (id: number, updateMaintenanceActionDto: UpdateMaintenanceActionDto) {
    return this.maintenanceActionRepository.update(
      id,
      updateMaintenanceActionDto,
    )
  }
  async ConfirmDelete (maintenanceId: number) {
    const maintenance = await this.maintenanceActionRepository.find({
      where: {
        maintenance: {
          id: maintenanceId,
        },
      },
    })
    if (maintenance.length > 0) {
      return await this.maintenanceActionRepository
        .createQueryBuilder()
        .delete()
        .from('maintenance_action')
        .where('maintenanceId = :maintenanceId', {
          maintenanceId: maintenanceId,
        })
        .execute()
    } else {
      return
    }
  }

  async updateConfirmSuccess (maintenanceId: number) {
    const maintenance = await this.maintenanceActionRepository.find({
      where: {
        maintenance: {
          id: maintenanceId,
        },
      },
    })
    if (maintenance.length > 0) {
      return await this.maintenanceActionRepository
        .createQueryBuilder()
        .update('maintenance_action')
        .set({ confirmSuccess: true })
        .where('maintenanceId = :maintenanceId', {
          maintenanceId: maintenanceId,
        })
        .execute()
    } else {
      return
    }
  }
}
