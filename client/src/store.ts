import { store } from 'react-easy-state'
import {
  getImgurImages,
  uploadToImgur,
  getLocalImages,
  uploadToServer
} from './api'
import { GetImgurImagesSerchParams } from '../../server/src/images/dto/getImgurImagesSearchParams'
import { ImgurImageSource, TileRenderer } from './interfaces'
import {
  GalleryItemImgur,
  GalleryItemTmp,
  GalleryItem,
  GalleryItemLocal
} from './models'
import { dataUrlToBlob, svgToImageAsDataUrl } from './utils'

export class State {
  images: GalleryItemImgur[] = []
  imagesTmp: GalleryItemTmp[] = []
  imagesLocal: GalleryItemLocal[] = []
  imagesLocalOffset = 0
  imagesLocalCount = 0
  imagesCurrentPage = 1
  imgurImageSourceType = ImgurImageSource.subreddit
  imgurImageSourceValue = 'EarthPorn'
  selectedImage?: GalleryItem
  modalIsOpen = false
  loading = false
  newLink: string = ''
  currentTileRenderer = TileRenderer.circleRenderer
  imageTitle = ''
  showMosaic = false
  toggle() {
    this.showMosaic = !this.showMosaic
  }

  /**
   * fetch images, based on state
   */
  async getImgurImages() {
    let opts: GetImgurImagesSerchParams

    if (this.imgurImageSourceType === ImgurImageSource.subreddit) {
      opts = {
        subreddit: this.imgurImageSourceValue,
        page: this.imagesCurrentPage
      }
    } else {
      opts = {
        page: this.imagesCurrentPage,
        albumId: this.imgurImageSourceValue
      }
    }

    const data = await getImgurImages(opts)
    this.images = data.map(i => new GalleryItemImgur(i))
  }

  /**
   * fetch images stored on local server
   */
  async getLocalImages() {
    const { data, count } = await getLocalImages(this.imagesLocalOffset, 5)
    this.imagesLocalCount = count
    this.imagesLocal = data.map(i => new GalleryItemLocal(i))
  }

  /**
   * convert svg to image and upload
   */
  async uploadToImgur(svg: SVGSVGElement) {
    this.loading = true
    const dataUrl = await svgToImageAsDataUrl(svg)

    const blob = await dataUrlToBlob(dataUrl)

    const data = await uploadToImgur(blob, {
      title: this.imageTitle
    })
    this.newLink = data.link
    this.loading = false
  }

  /**
   * upload to local server
   */
  async uploadToServer() {
    this.loading = true
    if (this.selectedImage && this.selectedImage.dataUrl) {
      const blob = await dataUrlToBlob(this.selectedImage.dataUrl)

      const data = await uploadToServer(blob, { title: this.imageTitle })
      this.imageTitle = ''
      this.newLink = data.link
    }

    this.loading = false
    this.modalIsOpen = false
    this.getLocalImages()
  }

  /**
   * show image in modal with mosaic effect
   */
  async onImageClick(image: GalleryItem) {
    this.loading = true
    this.modalIsOpen = true
    this.selectedImage = image
    await this.selectedImage.setDataUrl()
    await this.selectedImage.setImageSize()
    this.loading = false
  }

  /**
   * set current page in paging
   */
  setImagesCurrentPage(count: 1 | -1) {
    if (count === -1) {
      if (this.imagesCurrentPage !== 0) {
        this.imagesCurrentPage -= 1
      }
    } else {
      this.imagesCurrentPage += 1
    }
  }
}

// store singleton
let appState = store(new State())

// for debugging in console
;(window as any).appState = appState

// reset store (for testing)
export function resetAppState(state: State = new State()) {
  appState = store(state)
}

export { appState }
