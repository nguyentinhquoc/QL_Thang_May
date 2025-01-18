import { Module } from '@nestjs/common';
import { TargetBusinesService } from './target_busines.service';
import { TargetBusinesController } from './target_busines.controller';

@Module({
  controllers: [TargetBusinesController],
  providers: [TargetBusinesService],
})
export class TargetBusinesModule {}
