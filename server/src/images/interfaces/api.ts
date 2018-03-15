import { CreateImagePayload } from '../dto/create-image-payload'
import { ImgurRestApi } from '../../typings/imgur-rest-api'

export type TGalleryResponse = ImgurRestApi.Response<ImgurRestApi.GalleryItem[]>
export type TImageUploadResponse = ImgurRestApi.Response<ImgurRestApi.Image>
export type TUploadPayloadArgs = CreateImagePayload & { buffer: Buffer }
