import { Module } from '@nestjs/common';
import { PermisionService } from './permision.service';
import { PermisionController } from './permision.controller';

@Module({
  controllers: [PermisionController],
  providers: [PermisionService],
})
export class PermisionModule {}
