import { Component, Inject } from '@nestjs/common'
import axios, { AxiosStatic } from 'axios'
import {
  TGalleryResponse,
  TImageUploadResponse,
  TUploadPayloadArgs
} from './interfaces/api'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ImageEntity } from './image.entity'

@Component()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>
  ) {}

  async getLocalImages(offset: number, limit: number) {
    return await this.imageRepository.findAndCount({
      select: ['id', 'mimetype', 'title'],
      skip: offset,
      take: limit
    })
  }

  async getLocalImage(id: number) {
    return await this.imageRepository.findOneById(id)
  }

  async saveLocalImage(entity: ImageEntity) {
    return await this.imageRepository.insert(entity)
  }
}
