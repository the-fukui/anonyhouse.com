import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.enableCors({ origin: process.env.BACKEND_CORS_DOMAIN })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3001)
}
bootstrap()
