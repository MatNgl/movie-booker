import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Active le CORS pour autoriser les requêtes provenant d'autres origines
  app.enableCors();

  // Activation de la validation globale pour valider automatiquement les DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Configuration de Swagger avec une authentification Bearer explicite
  const config = new DocumentBuilder()
    .setTitle('Movie Booking API')
    .setDescription('API pour l’application de réservation de films')
    .setVersion('1.0')
    // Définition d'un schéma d'authentification Bearer (JWT)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token', // nom de la clé d'authentification (sera utilisé dans les décorateurs @ApiBearerAuth())
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Démarrage de l'application sur le port spécifié (via la variable d'environnement PORT ou 3000 par défaut)
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();