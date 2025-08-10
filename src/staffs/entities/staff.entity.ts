import {Customer} from 'src/customer/entities/customer.entity'
import {Department} from 'src/departmens/entities/departmen.entity'
import {Maintenance} from 'src/maintenance/entities/maintenance.entity'
import {MaintenanceAction} from 'src/maintenance_actions/entities/maintenance_action.entity'
import {Notification} from 'src/notification/entities/notification.entity'
import {Permision} from 'src/permision/entities/permision.entity'
import {Position} from 'src/positions/entities/position.entity'
import {Project} from 'src/project/entities/project.entity'
import {ProjectEdit} from 'src/project_edit/entities/project_edit.entity'
import {ProjectStaff} from 'src/project_staff/entities/project_staff.entity'
import {ProjectStep} from 'src/project_steps/entities/project_step.entity'
import {TargetBusine} from 'src/target_busines/entities/target_busine.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm'
@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id: number
  @Column({length: 255})
  full_name: string
  @Column({unique: true, length: 15})
  number_phone: string
  @Column({unique: true, length: 255})
  email: string
  @Column('text', {nullable: true})
  address: string
  @Column({length: 255, nullable: false})
  avatar: string
  @Column('text', {nullable: true})
  description: string
  @Column({default: true})
  status: boolean
  @Column({length: 255})
  password: string
  @Column({default: false})
  role_admin: boolean
  @ManyToOne(() => Department, (department) => department.staff)
  department: Department
  @ManyToOne(() => Position, (position) => position.staff)
  position: Position

  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
  @OneToMany(() => ProjectStep, (projectStep) => projectStep.staff)
  projectSteps: ProjectStep[]
  @OneToMany(() => TargetBusine, (targetBusine) => targetBusine.staff)
  targetBusine: TargetBusine[]
  @OneToMany(() => ProjectEdit, (projectEdit) => projectEdit.staff)
  projectEdits: ProjectEdit[]
  @OneToMany(() => Notification, (notification) => notification.staff)
  notifications: Notification[]
  @OneToMany(() => ProjectStaff, (projectStaff) => projectStaff.staff)
  projectStaff: ProjectStaff[]
  @OneToMany(() => MaintenanceAction, (maintenanceAction) => maintenanceAction.staff)
  maintenanceActions: MaintenanceAction[]
  @ManyToMany(() => Permision, (permision) => permision.staffs)
  @JoinTable()
  permisions: Permision[]
  @OneToMany(() => Customer, customer => customer.staff)
  customers: Customer[];
}
