import { Injectable } from '@nestjs/common';
import { CreatePermisionDto } from './dto/create-permision.dto';
import { UpdatePermisionDto } from './dto/update-permision.dto';

@Injectable()
export class PermisionService {
  create(createPermisionDto: CreatePermisionDto) {
    return 'This action adds a new permision';
  }

  findAll() {
    return `This action returns all permision`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permision`;
  }

  update(id: number, updatePermisionDto: UpdatePermisionDto) {
    return `This action updates a #${id} permision`;
  }

  remove(id: number) {
    return `This action removes a #${id} permision`;
  }
}
