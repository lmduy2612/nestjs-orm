import { IConversation } from '../interfaces/conversation.interface';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'conversation' })
export class Conversation implements IConversation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255 })
  title: string;

  @Column()
  description: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @ManyToMany(() => User, (users) => users.conversations)
  @JoinTable({
    name: 'users_conversation',
    joinColumn: { name: 'conversation_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: User[];
}
