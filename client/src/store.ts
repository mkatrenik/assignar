import { store } from 'react-easy-state'
import { getGallery, upload } from './api'
import { GetGalleryOptions } from '../../server/src/images/dto/get-gallery-options'
import { ImgurImageSource, TileRenderer } from './interfaces'
import { GalleryItemImgur, GalleryItemLocal, GalleryItem } from './models'
import { dataUrlToBlob, svgToImageAsDataUrl } from './utils'

export class State {
  images: GalleryItemImgur[] = []
  imagesLocal: GalleryItemLocal[] = []
  imgurImageSourceType = ImgurImageSource.subreddit
  imgurImageSourceValue = ''
  selectedImage?: GalleryItem
  modalIsOpen = false
  loading = false
  newLink: string = ''
  currentTileRenderer = TileRenderer.circleRenderer

  async fetch(opts: GetGalleryOptions) {
    const data = await getGallery(opts)
    this.images = data.map(i => new GalleryItemImgur(i))
  }

  async upload(svg: SVGSVGElement) {
    this.loading = true
    const dataUrl = await svgToImageAsDataUrl(svg)

    const blob = await dataUrlToBlob(dataUrl)

    const data = await upload(blob, {
      title: 'foo',
      name: 'foo',
      description: ''
    })
    this.newLink = data.link
    this.loading = false
  }

  async onImageClick(image: GalleryItem) {
    this.loading = true
    this.modalIsOpen = true
    this.selectedImage = image
    await this.selectedImage.setDataUrl()
    await this.selectedImage.setImageSize()
    this.loading = false
  }
}

let appState = store(new State())

// for debugging in console
;(window as any).appState = appState

export function resetAppState(state: State = new State()) {
  appState = store(state)
}

export { appState }
