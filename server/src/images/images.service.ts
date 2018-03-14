import { Component, Inject } from '@nestjs/common'
import axios, { AxiosStatic } from 'axios'
import { TGalleryResponse } from './interfaces/api'
import { GetGalleryOptions } from './dto/get-gallery-options'

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
}
