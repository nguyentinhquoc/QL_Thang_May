import { Maintenance } from 'src/maintenance/entities/maintenance.entity'
import { Staff } from 'src/staffs/entities/staff.entity'
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Entity,
  OneToMany,
} from 'typeorm'
@Entity()
export class MaintenanceAction {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ default: true })
  confirmSuccess: boolean
  @Column({ default: null, nullable: true })
  status: Date
  @Column({ nullable: true })
  weight: number
  @CreateDateColumn()
  createdAt: Date
  @Column({ nullable: true })
  feedback: string
  @Column('json', { nullable: true })
  image: string
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
  @ManyToOne(() => Staff, staff => staff.maintenanceActions)
  staff: Staff
  @ManyToOne(() => Maintenance, maintenance => maintenance.maintenanceActions)
  maintenance: Maintenance
}
