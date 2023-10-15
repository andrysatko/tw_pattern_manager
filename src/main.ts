import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { urlencoded, json } from 'express';
import * as express from 'express';
import * as path from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.use('/graphql',graphqlUploadExpress({ maxFileSize: 1000000, maxFiles: 10 }));
  app.use('/static', express.static(path.join(process.cwd(), 'public')));
  await app.listen(3000);
}
bootstrap();
