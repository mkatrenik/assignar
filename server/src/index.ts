import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { ImagesModule } from './images/images.module'
import * as cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(ImagesModule)
  app.useGlobalPipes(new ValidationPipe({ transform: true }))
  app.use(cors())
  await app.listen(3000)
}
bootstrap()
