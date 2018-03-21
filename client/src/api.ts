import axios from 'axios'
import { GetImgurImagesSerchParams } from '../../server/src/images/dto/getImgurImagesSearchParams'
import { ImgurRestApi } from '../../server/src/typings/imgur-rest-api'
// import { mock } from './__mocks__/getGallery'
import { UploadImgurImageBody } from '../../server/src/images/dto/uploadImgurImageBody'
import { UploadLocalImageBody } from '../../server/src/images/dto/uploadLocalImageBody'
import { IImagesResponse } from '../../server/src/images/interfaces/api'

export const API_URL = 'http://localhost:3000'

axios.defaults.baseURL = API_URL

/**
 * get images from gallery or album
 */
export async function getImgurImages(options: GetImgurImagesSerchParams) {
  const res = await axios.get<ImgurRestApi.GalleryImage[]>('/api/v1/imgur', {
    params: options
  })
  return res.data
}

/**
 * get images from gallery or album
 */
export async function getLocalImages(offset: number, limit: number) {
  const res = await axios.get<{ data: IImagesResponse[]; count: number }>(
    '/api/v1/images',
    {
      params: {
        offset,
        limit
      }
    }
  )
  return res.data
}

/**
 * upload image
 */
export async function uploadToImgur(image: Blob, args: UploadImgurImageBody) {
  const form = new FormData()
  form.set('image', image)
  form.set('title', args.title)

  const res = await axios.post<ImgurRestApi.GalleryImage>('/api/v1/imgur', form)
  return res.data
}

/**
 * upload image
 */
export async function uploadToServer(image: Blob, args: UploadLocalImageBody) {
  const form = new FormData()
  form.set('image', image)
  form.set('title', args.title)

  const res = await axios.post<ImgurRestApi.GalleryImage>(
    '/api/v1/images',
    form
  )
  return res.data
}
