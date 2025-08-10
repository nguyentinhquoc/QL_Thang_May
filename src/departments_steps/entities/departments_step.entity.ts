import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Department } from 'src/departmens/entities/departmen.entity'
import { Step } from 'src/steps/entities/step.entity'

@Entity()
export class DepartmentsStep {
  @PrimaryGeneratedColumn() id: number
  @ManyToOne(() => Department, department => department.departmentsStep)
  department: Department
  @ManyToOne(() => Step, step => step.departmentsSteps)
  step: Step
}
