import { Staff } from "src/staffs/entities/staff.entity";
import { ManyToMany, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
@Entity()
export class Permision {
  @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

  @ManyToMany(() => Staff, staff => staff.permisions)
    staffs: Staff[];
}
