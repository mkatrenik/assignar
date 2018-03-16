import { store } from 'react-easy-state'
import { ImgurRestApi } from '../../server/src/typings/imgur-rest-api'
import { getGallery } from './api'
import { GetGalleryOptions } from '../../server/src/images/dto/get-gallery-options'
import { ImgurImageSource } from './interfaces'

export class State {
  images: ImgurRestApi.GalleryItem[] = []
  imgurImageSourceType = ImgurImageSource.subreddit
  imgurImageSourceValue = ''

  async fetch(opts: GetGalleryOptions) {
    const data = await getGallery(opts)
    this.images = data
  }
}

export const appState = ((window as any).appState = store(new State()))
