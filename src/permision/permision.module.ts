import { Module } from '@nestjs/common';
import { PermisionService } from './permision.service';
import { PermisionController } from './permision.controller';
import { Permision } from './entities/permision.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Permision])],
  controllers: [PermisionController],
  providers: [PermisionService],
  exports: [PermisionService],
})
export class PermisionModule {}
