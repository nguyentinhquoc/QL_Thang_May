import { Module } from '@nestjs/common';
import { TargetBusinesService } from './target_busines.service';
import { TargetBusinesController } from './target_busines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TargetBusine } from './entities/target_busine.entity';
import { StaffsModule } from 'src/staffs/staffs.module';

@Module({
  imports: [TypeOrmModule.forFeature([TargetBusine]),StaffsModule],
  controllers: [TargetBusinesController],
  providers: [TargetBusinesService],
  exports: [TargetBusinesService],

})
export class TargetBusinesModule {}
