import { Injectable } from '@nestjs/common';
import { CreateTargetBusineDto } from './dto/create-target_busine.dto';
import { UpdateTargetBusineDto } from './dto/update-target_busine.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TargetBusine } from './entities/target_busine.entity';
import { Repository } from 'typeorm';
import { Staff } from 'src/staffs/entities/staff.entity';

@Injectable()

export class TargetBusinesService {
  constructor(
    @InjectRepository(TargetBusine)
    private targetBusinesRepository: Repository<TargetBusine>,
  ) { }
 async create(createTargetBusineDto: CreateTargetBusineDto) {
   console.log('createTargetBusineDto.staffId', CreateTargetBusineDto)
   return await this.targetBusinesRepository.save(createTargetBusineDto)
  }

  async findAllWStaff(id: number) {
    return await this.targetBusinesRepository.find({
      where: { staff: { id } },
    });
  }

}
