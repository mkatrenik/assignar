import { Component, Inject } from '@nestjs/common'
import axios, { AxiosStatic } from 'axios'
import {
  TGalleryResponse,
  TImageUploadResponse,
  TUploadPayloadArgs
} from './interfaces/api'
import { GetImgurImagesSerchParams } from './dto/getImgurImagesSearchParams'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ImageEntity } from './image.entity'

@Component()
export class ImgurService {
  constructor(
    @Inject('ImgurRestApiClient') private readonly apiClient: AxiosStatic,
    @Inject('ImgurDefaultAlbumDeleteHash') private readonly album: string
  ) {}

  /**
   * return subreddit gallery, or album images as array
   */
  async fetchSubredditGallery({
    subreddit,
    sort,
    page,
    window,
    albumId
  }: GetImgurImagesSerchParams) {
    let url = ''
    if (subreddit) {
      url = `/gallery/r/${subreddit}/${sort}/${window}/${page}`
    } else {
      url = `/album/${albumId}/images`
    }

    const resp = await this.apiClient.get<TGalleryResponse>(url)

    return resp.data.data
  }

  /**
   * upload image to imgur's album
   */
  async uploadImage(args: TUploadPayloadArgs) {
    const { buffer, ...options } = args
    const resp = await this.apiClient.post<TImageUploadResponse>(`/image`, {
      image: buffer.toString('base64'),
      type: 'base64',
      album: this.album,
      ...options
    })
    return resp.data.data
  }
}
