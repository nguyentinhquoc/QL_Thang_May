import { Module, forwardRef } from '@nestjs/common';
import { HistoryMaintenanceService } from './history-maintenance.service';
import { HistoryMaintenanceController } from './history-maintenance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryMaintenance } from './entities/history-maintenance.entity';
import { ProjectModule } from 'src/project/project.module';
import { Project } from 'src/project/entities/project.entity';

@Module({
   imports: [
     TypeOrmModule.forFeature([HistoryMaintenance,Project]),
     forwardRef(() => ProjectModule)
   ],
  controllers: [HistoryMaintenanceController],
  providers: [HistoryMaintenanceService],
  exports: [HistoryMaintenanceService],
})
export class HistoryMaintenanceModule {}
