import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoryMaintenanceDto } from './create-history-maintenance.dto';

export class UpdateHistoryMaintenanceDto extends PartialType(CreateHistoryMaintenanceDto) {}
