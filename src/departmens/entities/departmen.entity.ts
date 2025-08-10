import { DepartmentsStep } from 'src/departments_steps/entities/departments_step.entity';
import { Staff } from 'src/staffs/entities/staff.entity';
import { Step } from 'src/steps/entities/step.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn, CreateDateColumn, DeleteDateColumn, ManyToMany } from 'typeorm';

@Entity()
export class Department {
  @PrimaryGeneratedColumn() id: number;
  @Column({ length: 255, unique: true }) name: string;

  @OneToMany(() => Staff, staff => staff.department)
  staff: Staff[];
  @OneToMany(() => DepartmentsStep, departmentsStep => departmentsStep.department)
  departmentsStep: DepartmentsStep[];

  @Column('text',{nullable:true})
  description: string
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
}