import { Component, Inject } from '@nestjs/common'
import axios, { AxiosStatic } from 'axios'

type TGalleryResponse = ImgurRestApi.Response<ImgurRestApi.GalleryItem>

@Component()
export class ImageService {
  constructor(
    @Inject('ImgurRestApiClient') private readonly apiClient: AxiosStatic
  ) {}

  async fetchSubredditGallery({ subreddit, sort, page, window }) {
    const resp = await this.apiClient.get<TGalleryResponse>(
      `/gallery/r/${subreddit}/${sort}/${window}/${page}`
    )

    return resp.data.data
  }
}
