//Entidades: User y RefreshToken
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// Enumeración de roles disponibles en la aplicación
export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  MEMBER = 'member',
}

@Entity('users') // nombre de la tabla
export class User {
  @PrimaryGeneratedColumn('uuid') // clave primaria UUID autogenerada
  id: string;

  @Column({ unique: true }) // columna única (no se permiten emails duplicados)
  email: string;

  @Column() // hash de la contraseña (nunca texto plano)
  passwordHash: string;

  @Column({ default: true })
  isActive: boolean; // para desactivar usuarios sin borrarlos

  @Column({ type: 'enum', enum: UserRole, default: UserRole.MEMBER })
  role: UserRole;

  @CreateDateColumn() // fecha de creación automática
  createdAt: Date;

  @UpdateDateColumn() // fecha de última actualización automática
  updatedAt: Date;
}