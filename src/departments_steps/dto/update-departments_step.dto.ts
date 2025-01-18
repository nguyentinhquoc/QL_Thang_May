import { PartialType } from '@nestjs/mapped-types';
import { CreateDepartmentsStepDto } from './create-departments_step.dto';

export class UpdateDepartmentsStepDto extends PartialType(CreateDepartmentsStepDto) {}
