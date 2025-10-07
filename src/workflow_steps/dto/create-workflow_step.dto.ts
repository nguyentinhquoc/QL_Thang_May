import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateWorkflowStepDto {
  @IsInt({message: 'ID bước phải là số nguyên'})
  @IsNotEmpty({message: 'ID bước không được để trống'})
  stepId: number;
  @IsInt({message: 'ID quy trình phải là số nguyên'})
  @IsNotEmpty({message: 'ID quy trình không được để trống'})
  workflowId: number;
}
