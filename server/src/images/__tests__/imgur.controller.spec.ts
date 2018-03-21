import { Test } from '@nestjs/testing'
import { ImgurImagesController } from '../imgur.controller'
import { ImgurService } from '../imgur.service'
import { imagesProviders, DEFAULT_ALBUM_DELETE_HASH } from '../images.providers'
import { GetImgurImagesSerchParams } from '../dto/getImgurImagesSearchParams'
import axios from 'axios'
import { UploadImgurImageBody } from '../dto/uploadImgurImageBody'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ImageEntity } from '../image.entity'

const galleryMockResponse = require('./gallery-subreddit-mock.json')

describe('ImgurController', () => {
  let imgurController: ImgurImagesController
  let imgurService: ImgurService

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [ImgurImagesController],
      components: [ImgurService, ...imagesProviders],
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          name: 'sqlite2',
          database: '/tmp/assignar.test.db',
          entities: [ImageEntity],
          synchronize: true,
          dropSchema: true
        }),
        TypeOrmModule.forFeature([ImageEntity])
      ]
    }).compile()

    imgurController = module.get<ImgurImagesController>(ImgurImagesController)
    imgurService = module.get<ImgurService>(ImgurService)
  })

  describe('get', () => {
    it('should return an array of images', async () => {
      const result = galleryMockResponse.data
      const options = new GetImgurImagesSerchParams()

      const spy = jest.spyOn(axios, 'get').mockImplementation(() => ({
        data: galleryMockResponse
      }))

      const response = await imgurController.getAll(options)

      expect(response).toBe(result)
      expect(Array.isArray(response)).toBeTruthy()
      expect(response).toHaveLength(4)
      spy.mockClear()
    })

    it('should be called with proper arguments', async () => {
      const options = new GetImgurImagesSerchParams()
      options.subreddit = 'aww'
      options.page = 3

      const spy = jest
        .spyOn(imgurService, 'fetchSubredditGallery')
        .mockImplementation(() => null)

      const response = await imgurController.getAll(options)
      expect(spy).toBeCalledWith(options)
      spy.mockClear()
    })
  })

  describe('upload', () => {
    it('should upload file', async () => {
      const file: Express.Multer.File = {
        buffer: new Buffer('foo'),
        fieldname: '',
        originalname: '',
        encoding: '',
        mimetype: '',
        size: 0,
        destination: '',
        filename: '',
        path: ''
      }

      const payload: UploadImgurImageBody = {
        title: 'title'
      }

      const spy = jest.spyOn(axios, 'post').mockImplementation(() => ({
        data: {}
      }))

      imgurController.upload(file, payload)
      expect(spy).toBeCalledWith('/image', {
        image: file.buffer.toString('base64'),
        album: DEFAULT_ALBUM_DELETE_HASH,
        type: 'base64',
        ...payload
      })
      spy.mockClear()
    })
  })
})
