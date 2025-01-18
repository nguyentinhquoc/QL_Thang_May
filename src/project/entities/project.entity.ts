import { Maintenance } from 'src/maintenance/entities/maintenance.entity'
import { Notification } from 'src/notification/entities/notification.entity'
import { ProjectEdit } from 'src/project_edit/entities/project_edit.entity'
import { ProjectStaff } from 'src/project_staff/entities/project_staff.entity'
import { ProjectStep } from 'src/project_steps/entities/project_step.entity'
import { Staff } from 'src/staffs/entities/staff.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm'
@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ length: 255 })
  full_name: string
  @Column({ length: 15 })
  number_phone: string
  @Column({ nullable: true, length: 255 })
  email: string
  @Column(`text`, { nullable: true })
  address: string
  @Column('json', { nullable: true })
  infor_product: string
  @Column({ length: 225, nullable: true })
  description: string
  @Column({ length: 225 })
  code_project: string
  @Column({ default: 0 })
  status: number
  @Column({ type: 'bigint', default: 0 })
  price: number
  @Column({ type: 'bigint', default: 0 })
  tax: number
  @Column({ type: 'date', nullable: true })
  warranty: Date
  @Column({ type: 'date', nullable: true })
  maintenanceFit: Date
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
  @OneToMany(() => ProjectStep, projectStep => projectStep.project)
  projectSteps: ProjectStep[]
  @OneToMany(() => ProjectEdit, projectEdit => projectEdit.project)
  projectEdits: ProjectEdit[]
  @OneToMany(() => Notification, notification => notification.project)
  notifications: Notification[]
  @OneToMany(() => Maintenance, maintenance => maintenance.project)
  maintenances: Maintenance[]
  @OneToMany(() => ProjectStaff, projectStaff => projectStaff.project)
  projectStaff: ProjectStaff[]
}
