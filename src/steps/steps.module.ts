import { Module } from '@nestjs/common'
import { StepsService } from './steps.service'
import { StepsController } from './steps.controller'
import { Step } from './entities/step.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DepartmentsStepsModule } from 'src/departments_steps/departments_steps.module'
import { DepartmensModule } from 'src/departmens/departmens.module'

@Module({
  imports: [TypeOrmModule.forFeature([Step]), DepartmentsStepsModule, DepartmensModule],
  controllers: [StepsController],
  providers: [StepsService],
  exports: [StepsService],
})
export class StepsModule {}
