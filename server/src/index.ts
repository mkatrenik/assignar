import { NestFactory } from '@nestjs/core'
// import { ApplicationModule } from './app.module'
import { ImagesModule } from './images/images.module'

async function bootstrap() {
  const app = await NestFactory.create(ImagesModule)
  await app.listen(3000)
}
bootstrap()
