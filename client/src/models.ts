import { ImgurRestApi } from '../../server/src/typings/imgur-rest-api'
import { urlToDataURL, getImageSize } from './utils'
import { TImageSize, TDataUrl } from './interfaces'

export abstract class GalleryItem {
  readonly id: string
  dataUrl?: TDataUrl
  size?: TImageSize

  constructor(id: string) {
    this.id = id
  }

  async setImageSize() {
    if (!this.dataUrl) {
      throw new Error(`this.dataUrl not set`)
    }
    this.size = await getImageSize(this.dataUrl)
  }

  async setDataUrl() {}
}

export class GalleryItemImgur extends GalleryItem {
  private readonly _link: string

  constructor(item: ImgurRestApi.GalleryItem) {
    super(item.id)
    this._link = item.link.replace(/.jpg$/, `m.jpg`)
  }

  async setDataUrl() {
    this.dataUrl = await urlToDataURL(this._link)
  }

  get link() {
    return this._link
  }
}

export class GalleryItemLocal extends GalleryItem {
  dataUrl: string

  constructor(item: TDataUrl) {
    super(GalleryItemLocal.generateId())
    this.dataUrl = item
  }

  static generateId() {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(0, 6)
  }

  get link() {
    return this.dataUrl
  }
}
