import { IMessage } from '../interfaces/messages.interface';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'messages' })
export class Messages implements IMessage {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  conversation_id: number;

  @Column()
  user_id: number;

  @Column()
  message: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @OneToMany(() => User, (users) => users.messages)
  user: User;
}
