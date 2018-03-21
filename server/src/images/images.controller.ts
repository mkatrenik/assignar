import {
  Get,
  Controller,
  Query,
  Body,
  Post,
  UseInterceptors,
  FileInterceptor,
  UploadedFile,
  Param,
  Response
} from '@nestjs/common'
import { ImagesService } from './images.service'
import * as jsImgGen from 'js-image-generator'
import { UploadLocalImageBody } from './dto/uploadLocalImageBody'
import { ImageEntity } from './image.entity'
import { IImagesResponse } from './interfaces/api'
import { GetLocalImagesSerchParams } from './dto/getLocalImagesSearchParams'

const generateImage = (width: number, height: number, quality = 80) => {
  return new Promise<Buffer>((resolve, reject) => {
    jsImgGen.generateImage(width, height, quality, (err, image) => {
      if (err) return reject(err)
      resolve(image.data)
    })
  })
}

@Controller('/api/v1/images')
export class LocalImagesController {
  constructor(private readonly imageService: ImagesService) {}

  /**
   * get list of images stored on server
   */
  @Get()
  async getImages(
    @Query() searchParams: GetLocalImagesSerchParams
  ): Promise<{ data: IImagesResponse[]; count: number }> {
    const [images, count] = await this.imageService.getLocalImages(
      searchParams.offset,
      searchParams.limit
    )
    const data = images.map(i => ({
      id: i.id,
      title: i.title,
      link: `/api/v1/images/${i.id}`
    }))
    return { data, count }
  }

  /**
   * get image stored in db
   */
  @Get(':id')
  async getImage(@Param('id') id, @Response() res) {
    const image = await this.imageService.getLocalImage(Number(id))
    res.set('Content-Type', image.mimetype)
    res.send(image.image)
  }

  /**
   * upload file & save to db
   */
  @Post()
  @UseInterceptors(FileInterceptor('image', { limits: { fileSize: 200000 } }))
  async saveImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: UploadLocalImageBody
  ) {
    const image = new ImageEntity()
    image.mimetype = file.mimetype
    image.image = file.buffer
    image.title = payload.title

    return this.imageService.saveLocalImage(image)
  }
}
