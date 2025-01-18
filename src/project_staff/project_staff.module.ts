import { Module } from '@nestjs/common'
import { ProjectStaffService } from './project_staff.service'
import { ProjectStaffController } from './project_staff.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectStaff } from './entities/project_staff.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ProjectStaff])],
  controllers: [ProjectStaffController],
  providers: [ProjectStaffService],
  exports: [ProjectStaffService],
})
export class ProjectStaffModule {}
