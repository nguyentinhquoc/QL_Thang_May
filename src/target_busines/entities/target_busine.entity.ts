import { Staff } from 'src/staffs/entities/staff.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm'
@Entity()
export class TargetBusine {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  year: number
  @Column()
  target: number
  @ManyToOne(() => Staff, staff => staff.targetBusine)
  staff: Staff
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
}
