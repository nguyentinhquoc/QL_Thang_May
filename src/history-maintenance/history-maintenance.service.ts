import { Injectable } from '@nestjs/common';
import { CreateHistoryMaintenanceDto } from './dto/create-history-maintenance.dto';
import { UpdateHistoryMaintenanceDto } from './dto/update-history-maintenance.dto';
import { HistoryMaintenance } from './entities/history-maintenance.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HistoryMaintenanceService {
  constructor(
    @InjectRepository(HistoryMaintenance)
    private historyMaintenance: Repository<HistoryMaintenance>,
  ) {}
  create(createHistoryMaintenanceDto: CreateHistoryMaintenanceDto) {
    return this.historyMaintenance.save(createHistoryMaintenanceDto)
  }
  async findOneByProjectNow(idProject: number) {
    const currentDate = new Date();
    return this.historyMaintenance.find({
      where: {
        project: {id: idProject},
        timeStart: LessThanOrEqual(currentDate),
        timeEnd: MoreThanOrEqual(currentDate)
      },
      relations: ['project', 'maintenance'],
      order: {
        timeStart: 'DESC',
      },
    })
  }
  async findByProject(idProject: number) {
    return this.historyMaintenance.find({
      where: {
        project: {id: idProject},
      },
      relations: ['project', 'maintenance'],
    })
  }
}
