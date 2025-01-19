import { PartialType } from '@nestjs/mapped-types';
import { CreateTargetBusineDto } from './create-target_busine.dto';

export class UpdateTargetBusineDto extends PartialType(CreateTargetBusineDto) {}
