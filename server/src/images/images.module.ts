import { Module } from '@nestjs/common'
import { ImagesController } from './images.controller'
import { imagesProviders } from './images.providers'
import { ImageService } from './images.service'

@Module({
  imports: [],
  controllers: [ImagesController],
  components: [...imagesProviders, ImageService]
})
export class ImagesModule {}
