import { ImgurRestApi } from '../../server/src/typings/imgur-rest-api'
import { urlToDataURL, getImageSize } from './utils'
import { TImageSize, TDataUrl } from './interfaces'
import { API_URL } from './api'
import { IImagesResponse } from '../../server/src/images/interfaces/api'

export abstract class GalleryItem {
  readonly id: string

  /**
   * DataUrl representation of image
   */
  dataUrl?: TDataUrl

  /**
   * struct representing image dimensions
   */
  size?: TImageSize

  /**
   * link - either url or dataurl
   */
  link?: string

  constructor(id: string) {
    this.id = id
  }

  /**
   * computes image dimensions
   */
  async setImageSize() {
    if (!this.dataUrl) {
      throw new Error(`this.dataUrl not set`)
    }
    this.size = await getImageSize(this.dataUrl)
  }

  /**
   * convert image from link to dataUrl
   */
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

export class GalleryItemTmp extends GalleryItem {
  dataUrl: string

  constructor(item: TDataUrl) {
    super(GalleryItemTmp.generateId())
    this.dataUrl = item
  }

  /**
   * generate fake id for local images
   */
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

export class GalleryItemLocal extends GalleryItem {
  readonly link: string

  constructor(item: IImagesResponse) {
    super(String(item.id))
    this.link = `${API_URL}${item.link}`
  }

  async setDataUrl() {
    this.dataUrl = await urlToDataURL(this.link)
  }
}
