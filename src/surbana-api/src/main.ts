import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ErrorFilter } from './middlewares/errors.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  //Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Surbana API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('Buildings', '')
    .addTag('Locations', '')
    // .addBearerAuth(
    //   { in: 'header', type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    //   'access-token',
    // )
    // .addApiKey({ type: 'apiKey', name: 'X-Api-Key', in: 'header' }, 'X-Api-Key')
    .addServer(
      `/${
        process.env.NODE_ENV === 'production' ? process.env.SERVICE_NAME : ''
      }`,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['', 'v1', 'v2'],
    prefix: '',
  });

  ///app.useGlobalFilters(new ErrorFilter());
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }),);
  app.enableCors({
    credentials: true,
  });

  await app.listen(process.env.NODE_ENV == 'production' ? 8080 : 8888);
}
bootstrap();
