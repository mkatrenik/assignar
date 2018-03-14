import axios from 'axios'

const IMGUR_CLIENT_ID = 'e19091a8f355573'

axios.defaults.baseURL = 'https://api.imgur.com/3'
axios.defaults.headers.common.Authorization = `Client-ID ${IMGUR_CLIENT_ID}`

export const imagesProviders = [
  {
    provide: 'ImgurRestApiClient',
    useValue: axios
  }
]
