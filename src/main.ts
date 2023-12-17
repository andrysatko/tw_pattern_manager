import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { urlencoded, json } from 'express';
import * as express from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv'
import * as fs from 'fs';
dotenv.config()
import {Request, Response} from 'express'
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.use('/graphql',graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
  app.use(`/${process.env.STATIC_ENDPOINT}`, express.static(path.join(process.cwd(), 'public')));
  await app.listen(3000);
}
bootstrap();