import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { UserRole } from "../enums/UserRole.js";
import { Exclude } from "class-transformer";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true, type: "varchar", length: 255 })
  email!: string;

  @Exclude()
  @Column({ type: "varchar", length: 255 })
  password!: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.DOCTOR })
  role!: UserRole;

  @OneToMany("Patient", "doctor")
  patients!: any[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
