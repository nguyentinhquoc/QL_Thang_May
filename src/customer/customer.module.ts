import { DepartmensModule } from 'src/departmens/departmens.module';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffsService } from 'src/staffs/staffs.service';
import { StaffsModule } from 'src/staffs/staffs.module';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]),StaffsModule,DepartmensModule],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
