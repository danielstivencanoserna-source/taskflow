// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- Middlewares de seguridad ---
  // Helmet: agrega cabeceras HTTP como X-Content-Type-Options, X-Frame-Options, etc.
  app.use(helmet());

  // Habilitar el manejo de cookies (necesario para leer refresh_token)
  app.use(cookieParser());

  // CORS: permite solicitudes desde tu frontend (ajusta origin en producción)
  app.enableCors({
    origin: 'http://localhost:4200', // Cambia esto por la URL real de tu frontend
    credentials: true, // permite envío de cookies cross-origin
  });

  // Rate limiting: protege contra ataques de fuerza bruta y DoS básico
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100, // máximo 100 solicitudes por IP en ese período
      message: 'Demasiadas solicitudes, intenta de nuevo más tarde.',
    }),
  );

  // ValidationPipe global: aplica validaciones definidas en DTOs automáticamente
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades no definidas en el DTO
      transform: true, // transforma los datos a los tipos esperados
      forbidNonWhitelisted: true, // lanza error si se envían propiedades no permitidas
    }),
  );

  // --- Configuración de Swagger ---
  const config = new DocumentBuilder()
    .setTitle('TaskFlow API')
    .setDescription('Documentación de la API de gestión de proyectos')
    .setVersion('1.0')
    .addCookieAuth('Authentication') // Indica que usaremos autenticación por cookie
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Swagger disponible en /api/docs

  await app.listen(process.env.API_PORT || 3000);
}
bootstrap();
