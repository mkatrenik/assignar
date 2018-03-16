import axios from 'axios'
import { GetGalleryOptions } from '../../server/src/images/dto/get-gallery-options'
import { ImgurRestApi } from '../../server/src/typings/imgur-rest-api'
import { mock } from './__mocks__/getGallery'

axios.defaults.baseURL = 'http://localhost:3000'

export async function getGallery(options: GetGalleryOptions) {
  console.log(options)

  return (mock as any) as ImgurRestApi.GalleryItem[]
  // const res = await axios.get<ImgurRestApi.GalleryImage[]>('/api/v1/images', {
  //   params: options
  // })
  // return res.data
}
