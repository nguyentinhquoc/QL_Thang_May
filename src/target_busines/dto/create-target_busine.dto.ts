import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { Staff } from 'src/staffs/entities/staff.entity';
export class CreateTargetBusineDto {
  @IsNotEmpty()
  year: number;
  @IsNotEmpty()
  target: number;
  @IsNotEmpty()
  staff: Staff;
}
