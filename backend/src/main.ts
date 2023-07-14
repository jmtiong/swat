import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VERSION_NEUTRAL, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { getFromContainer, MetadataStorage } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import express from 'express'

// solve prisma 'Do not know how to serialize a BigInt' issue
// Ref: https://github.com/prisma/studio/issues/614
// @TODO: Treat it as any because typescript will throw error on toJSON cannot be found in BigInt
(BigInt.prototype as any).toJSON = function () {
  return Number(this.toString())
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL
  });
  app.use(express.json({ limit: '50mb' }))

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }))

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('SWAT')
    .setDescription('API from SWAT')
    .setVersion('1.0')
    .build()

  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
  }
  const document = SwaggerModule.createDocument(app, config, options)

  const metadatas = (getFromContainer(MetadataStorage) as any).validationMetadatas
  const schemas = validationMetadatasToSchemas(metadatas)

  document.components.schemas = Object.assign({}, document.components.schemas || {}, schemas)

  SwaggerModule.setup('api', app, document)
  await app.listen(3000);
}
bootstrap();
