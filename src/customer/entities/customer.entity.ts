import { Staff } from 'src/staffs/entities/staff.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm'

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ default: null, nullable: true })
  status: Date
  @Column({ length: 255 })
  full_name: string
  @Column({ length: 15 })
  number_phone: string
  @Column({ nullable: true, length: 255 })
  email: string
  @Column(`text`, { nullable: true })
  address: string
  @Column({ length: 225, nullable: true })
  description: string
  @CreateDateColumn()
  createdAt: Date
  @UpdateDateColumn()
  updatedAt: Date
  @DeleteDateColumn()
  deletedAt?: Date
  @ManyToOne(() => Staff, staff => staff.customers, { nullable: true })
  staff: Staff;
}
