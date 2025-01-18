import { WorkflowStep } from 'src/workflow_steps/entities/workflow_step.entity'
import { Department } from 'src/departmens/entities/departmen.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm'
import { DepartmentsStep } from 'src/departments_steps/entities/departments_step.entity'
@Entity()
export class Step {
  @PrimaryGeneratedColumn() id: number
  @Column({ length: 225, unique: true })
  name: string
  @Column('text', { nullable: true })
  description: string
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
  @OneToMany(() => WorkflowStep, workflowStep => workflowStep.step)
  workflowSteps: WorkflowStep[]
  @OneToMany(() => DepartmentsStep, departmentsStep => departmentsStep.step)
  departmentsSteps: DepartmentsStep[]

}
