import { Component, Inject } from '@nestjs/common'
import axios, { AxiosStatic } from 'axios'
import {
  TGalleryResponse,
  TImageUploadResponse,
  TUploadPayloadArgs
} from './interfaces/api'
import { GetGalleryOptions } from './dto/get-gallery-options'
import { CreateImagePayload } from './dto/create-image-payload'

@Component()
export class ImageService {
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
  }: GetGalleryOptions) {
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
