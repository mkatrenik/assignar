import axios from 'axios'

const IMGUR_CLIENT_ID = 'e19091a8f355573'

export const DEFAULT_ALBUM_ID = 'K5Ror'
export const DEFAULT_ALBUM_DELETE_HASH = 'mkEtPZ3agJ6mydJ'

axios.defaults.baseURL = 'https://api.imgur.com/3'
axios.defaults.headers.common.Authorization = `Client-ID ${IMGUR_CLIENT_ID}`

export const imagesProviders = [
  {
    provide: 'ImgurRestApiClient',
    useValue: axios
  },
  {
    provide: 'ImgurDefaultAlbumId',
    useValue: DEFAULT_ALBUM_ID
  },
  {
    provide: 'ImgurDefaultAlbumDeleteHash',
    useValue: DEFAULT_ALBUM_DELETE_HASH
  }
]
