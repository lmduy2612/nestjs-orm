import { IUser } from '../interfaces/user.interface';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  Column,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Conversation } from '../../conversation/entities/conversation.entity';
import { Messages } from '../../messages/entities/messages.entity';

@Entity({ name: 'users' })
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 25, nullable: true })
  name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ name: 'password', length: 255 })
  password: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @OneToMany(() => Messages, (message) => message.user)
  messages?: Messages[];

  @ManyToMany(() => Conversation, (conversations) => conversations.users)
  @JoinTable({
    name: 'users_conversation',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'conversation_id' },
  })
  conversations: Conversation[];
}
