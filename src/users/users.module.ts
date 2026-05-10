// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // registra la entidad para este módulo
  providers: [UsersService],
  exports: [UsersService], // exportamos el servicio para que otros módulos lo usen
})
export class UsersModule {}