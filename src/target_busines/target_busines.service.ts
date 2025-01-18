import { Injectable } from '@nestjs/common';
import { CreateTargetBusineDto } from './dto/create-target_busine.dto';
import { UpdateTargetBusineDto } from './dto/update-target_busine.dto';

@Injectable()
export class TargetBusinesService {
  create(createTargetBusineDto: CreateTargetBusineDto) {
    return 'This action adds a new targetBusine';
  }

  findAll() {
    return `This action returns all targetBusines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} targetBusine`;
  }

  update(id: number, updateTargetBusineDto: UpdateTargetBusineDto) {
    return `This action updates a #${id} targetBusine`;
  }

  remove(id: number) {
    return `This action removes a #${id} targetBusine`;
  }
}
