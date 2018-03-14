import { Component, Inject } from '@nestjs/common'
import axios, { AxiosStatic } from 'axios'
import { TGalleryResponse, TImageUploadResponse } from './interfaces/api'
import { GetGalleryOptions } from './dto/get-gallery-options'
import * as fs from 'fs'

@Component()
export class ImageService {
  constructor(
    @Inject('ImgurRestApiClient') private readonly apiClient: AxiosStatic
  ) {}

  async fetchSubredditGallery({
    subreddit,
    sort,
    page,
    window
  }: GetGalleryOptions) {
    const resp = await this.apiClient.get<TGalleryResponse>(
      `/gallery/r/${subreddit}/${sort}/${window}/${page}`
    )

    return resp.data.data
  }

  async uploadImage(buffer: Buffer) {
    const resp = await this.apiClient.post<TImageUploadResponse>(`/image`, {
      image: buffer.toString('base64'),
      type: 'base64'
    })
    return resp.data.data
  }
}
