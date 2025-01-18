import { Module } from '@nestjs/common';
import { DepartmentsStepsService } from './departments_steps.service';
import { DepartmentsStepsController } from './departments_steps.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsStep } from './entities/departments_step.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentsStep])],
  controllers: [DepartmentsStepsController],
  providers: [DepartmentsStepsService],
  exports: [DepartmentsStepsService],
})
export class DepartmentsStepsModule {}
