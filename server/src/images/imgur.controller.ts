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
import { ImgurService } from './imgur.service'
import { ImagesService } from './images.service'
import { GetImgurImagesSerchParams } from './dto/getImgurImagesSearchParams'
import { UploadImgurImageBody } from './dto/uploadImgurImageBody'
import * as jsImgGen from 'js-image-generator'

@Controller('/api/v1/imgur')
export class ImgurImagesController {
  constructor(private readonly imgurService: ImgurService) {}

  /**
   * fetch images
   */
  @Get()
  async getAll(@Query() options: GetImgurImagesSerchParams) {
    return this.imgurService.fetchSubredditGallery(options)
  }

  /**
   * upload file
   */
  @Post()
  @UseInterceptors(FileInterceptor('image', { limits: { fileSize: 200000 } }))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: UploadImgurImageBody
  ) {
    return this.imgurService.uploadImage({ buffer: file.buffer, ...payload })
  }
}
