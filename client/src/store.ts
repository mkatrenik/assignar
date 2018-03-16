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

let appState = store(new State())
;(window as any).appState = appState

export function resetAppState(state: State = new State()) {
  appState = store(state)
}

export { appState }
