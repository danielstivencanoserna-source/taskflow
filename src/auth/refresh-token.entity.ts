//Entidad RefreshToken
// src/auth/refresh-token.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string; // hash del refresh token (no se guarda el token original)

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' }) // relación: muchos refresh tokens pertenecen a un usuario
  @JoinColumn({ name: 'userId' }) // la columna userId será la FK
  user: User;

  @Column()
  expiresAt: Date; // fecha de expiración del token

  @CreateDateColumn()
  createdAt: Date;
}