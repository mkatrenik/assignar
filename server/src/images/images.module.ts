import { Module } from '@nestjs/common'
import { LocalImagesController } from './images.controller'
import { ImgurImagesController } from './imgur.controller'
import { imagesProviders } from './images.providers'
import { ImagesService } from './images.service'
import { ImgurService } from './imgur.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImageEntity } from './image.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      name: 'sqlite',
      database:
        process.env.NODE_ENV === 'test'
          ? '/tmp/assignar.test.db'
          : '/tmp/assignar.dev.db',
      entities: [ImageEntity],
      synchronize: true,
      dropSchema: process.env.NODE_ENV === 'test'
    }),
    TypeOrmModule.forFeature([ImageEntity])
  ],
  controllers: [ImgurImagesController, LocalImagesController],
  components: [...imagesProviders, ImagesService, ImgurService]
})
export class ImagesModule {}
