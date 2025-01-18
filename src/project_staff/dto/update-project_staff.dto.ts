import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectStaffDto } from './create-project_staff.dto';

export class UpdateProjectStaffDto extends PartialType(CreateProjectStaffDto) {}
