import { Module } from '@nestjs/common'
import { ProjectStaffService } from './project_staff.service'
import { ProjectStaffController } from './project_staff.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectStaff } from './entities/project_staff.entity'
import { TargetBusinesModule } from 'src/target_busines/target_busines.module'

@Module({
  imports: [TypeOrmModule.forFeature([ProjectStaff]),TargetBusinesModule],
  controllers: [ProjectStaffController],
  providers: [ProjectStaffService],
  exports: [ProjectStaffService],
})
export class ProjectStaffModule {}
