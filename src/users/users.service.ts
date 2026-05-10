// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    // Inyección del repositorio de la entidad User
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    // findOne busca un registro por condición; aquí por email exacto
    return this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(userData: Partial<User>): Promise<User> {
    // Crea una instancia de User con los datos proporcionados (no la guarda aún)
    const user = this.usersRepository.create(userData);
    // Guarda el usuario en la base de datos (INSERT)
    return this.usersRepository.save(user);
  }
}