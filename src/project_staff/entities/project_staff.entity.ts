import { Project } from 'src/project/entities/project.entity'
import { Staff } from 'src/staffs/entities/staff.entity'
import {
  Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn,UpdateDateColumn,
DeleteDateColumn } from 'typeorm'
@Entity('project_staff')
export class ProjectStaff {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Project, project => project.projectStaff)
  project: Project
  @ManyToOne(() => Staff, staff => staff.projectStaff)
  staff: Staff
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
}
