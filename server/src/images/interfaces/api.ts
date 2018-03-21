import { UploadImgurImageBody } from '../dto/uploadImgurImagebody'
import { ImgurRestApi } from '../../typings/imgur-rest-api'

export type TGalleryResponse = ImgurRestApi.Response<ImgurRestApi.GalleryItem[]>
export type TImageUploadResponse = ImgurRestApi.Response<ImgurRestApi.Image>
export type TUploadPayloadArgs = UploadImgurImageBody & { buffer: Buffer }

export interface IImagesResponse {
  id: number
  title: string
  link: string
}
