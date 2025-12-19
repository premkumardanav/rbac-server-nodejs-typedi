import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Index,
} from "typeorm";
import { Exclude } from "class-transformer";

@Entity("patients")
@Index(["doctor"])
export class Patient {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Exclude()
  @Column({ nullable: true, type: "text", select: false })
  diagnosis!: string;

  @ManyToOne("User", "patients", {
    eager: false,
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "doctorId" })
  doctor!: any;

  @ManyToOne("User", {
    eager: false,
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "nurseId" })
  nurse!: any;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
