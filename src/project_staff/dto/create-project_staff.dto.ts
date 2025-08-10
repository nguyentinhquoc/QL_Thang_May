// create-project-staff.dto.ts

import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { Project } from 'src/project/entities/project.entity';
import { Staff } from 'src/staffs/entities/staff.entity';

export class CreateProjectStaffDto {

  project: Project;


  staff: Staff;

}
