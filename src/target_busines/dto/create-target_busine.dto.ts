import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { Staff } from 'src/staffs/entities/staff.entity';
export class CreateTargetBusineDto {
  @IsNotEmpty({message: 'Năm không được để trống'})
  year: number;
  @IsNotEmpty({message: 'Chỉ tiêu không được để trống'})
  target: number;
  @IsNotEmpty({message: 'Nhân viên không được để trống'})
  staff: Staff;
}
