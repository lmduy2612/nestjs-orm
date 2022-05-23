import { IDevices } from '../interfaces/devices.interface';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity({ name: 'devices' })
export class Devices implements IDevices {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  users_id: number;

  @Column({ length: 255 })
  client_id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;
}
