import { IsNumber } from "class-validator";
import { Department } from "src/departmens/entities/departmen.entity";
import { Step } from "src/steps/entities/step.entity";

export class CreateDepartmentsStepDto {
  department: Department
  step: Step
}
