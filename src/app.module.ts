import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import configuration from './config/configuration';

@Module({
  imports: [
     // 1. Cargar configuración y validar esquema de variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,             // disponible en toda la app sin importar en cada módulo
      load: [configuration],      // carga la función de configuración
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().default(5432),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        JWT_ACCESS_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        API_PORT: Joi.number().default(3000),
      }),
    }),
    
  // 2. Configurar la conexión a PostgreSQL con TypeORM
  TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // escanea todas las entidades
        synchronize: true, // ¡SOLO EN DESARROLLO! En producción se usan migraciones.
      }),
    }),
  ],
})
    
export class AppModule {}
