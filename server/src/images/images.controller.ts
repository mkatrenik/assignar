import {
  Get,
  Controller,
  Query,
  Post,
  UseInterceptors,
  FileInterceptor,
  UploadedFile
} from '@nestjs/common'
import { ImageService } from './images.service'
import { GetGalleryOptions } from './dto/get-gallery-options'

@Controller('/api/v1/images')
export class ImagesController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async root(@Query() options: GetGalleryOptions) {
    return this.imageService.fetchSubredditGallery(options)
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', { limits: { fileSize: 20000 } }))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.uploadImage(file.buffer)
  }
}
