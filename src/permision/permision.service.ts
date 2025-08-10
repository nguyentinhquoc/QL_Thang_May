import { Injectable } from '@nestjs/common';
import { CreatePermisionDto } from './dto/create-permision.dto';
import { UpdatePermisionDto } from './dto/update-permision.dto';
import { Permision } from './entities/permision.entity';
import { getRepository, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class PermisionService {
  constructor(
    // private readonly permisionRepository: Repository<Permision>, // Uncomment if using TypeORM
    @InjectRepository(Permision) private readonly permisionRepository: Repository<Permision>, // Uncomment if using TypeORM
  ) {}
  create(createPermisionDto: CreatePermisionDto) {
    return 'This action adds a new permision';
  }
  // Lấy ra quyền của nhân viên từ bảng nhiều-nhiều (giả sử staffs và permision là quan hệ many-to-many)
  async checkPermision(idStaff: number, idPermision: number) {
    // Tìm xem nhân viên này có quyền này không thông qua bảng liên kết many-to-many
    const permision = await this.permisionRepository.findOne({
      where: {
        id: idPermision,
        staffs: {
          id: idStaff
        }
      },
      relations: ['staffs']
    });
   return permision.staffs[0].status ? true : false
  }
  async findAll() {
    const permissions = await this.permisionRepository.find({
      order: {
        id: 'ASC'
      },
    });
    return permissions;
  }
  async findPhanqQuyen(idStaff: number) {
    const permissions = await this.permisionRepository.find({
      where: {
        staffs: {
          id: idStaff
        }
      },
      order: {
        id: 'ASC'
      },
    });
    return permissions;
  }
  async finByStaff(idStaff: number) {
    const permissions = await this.permisionRepository.find({
      select: ['id'],
      where: {
        staffs: {
          id: idStaff
        }
      },
      order: {
        id: 'ASC'
      },
    });
    // Extract IDs and push them into an array
    const permissionIds: number[] = permissions.map(permission => permission.id);
    return permissionIds;
  }
  async udpatePhanQuyen(idStaff: number) {
    await this.permisionRepository.manager.createQueryBuilder()
      .delete()
      .from('staff_permisions_permision')
      .where("staffId = :staffId", { staffId: idStaff })
      .execute();
  }

  async createQuyen(staffId: number, permissionIds: number[]) {
    try {
      // Create query builder to insert relations
      const queryBuilder = this.permisionRepository.manager.createQueryBuilder();
      // For each permission ID, create a relation with the staff
      for (const permissionId of permissionIds) {
        await queryBuilder
          .insert()
          .into('staff_permisions_permision')
          .values({
            staffId: staffId,
            permisionId: permissionId
          })
          .execute();
      }
      return { success: true, message: 'Permissions assigned successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to assign permissions', error };
    }
  }
}
