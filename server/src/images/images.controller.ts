import {
  Get,
  Controller,
  Query,
  Body,
  Post,
  UseInterceptors,
  FileInterceptor,
  UploadedFile
} from '@nestjs/common'
import { ImageService } from './images.service'
import { GetGalleryOptions } from './dto/get-gallery-options'
import { CreateImagePayload } from './dto/create-image-payload'

@Controller('/api/v1/images')
export class ImagesController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async root(@Query() options: GetGalleryOptions) {
    return this.imageService.fetchSubredditGallery(options)
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', { limits: { fileSize: 200000 } }))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: CreateImagePayload
  ) {
    return this.imageService.uploadImage({ buffer: file.buffer, ...payload })
  }
}
