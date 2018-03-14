import { Test } from '@nestjs/testing'
import { ImagesController } from '../images.controller'
import { ImageService } from '../images.service'
import { imagesProviders, DEFAULT_ALBUM_DELETE_HASH } from '../images.providers'
import { GetGalleryOptions } from '../dto/get-gallery-options'
import axios from 'axios'
import { CreateImagePayload } from '../dto/create-image-payload'

const galleryMockResponse = require('./gallery-subreddit-mock.json')

describe('ImagesController', () => {
  let imagesController: ImagesController
  let imagesService: ImageService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ImagesController],
      components: [ImageService, ...imagesProviders]
    }).compile()

    imagesController = module.get<ImagesController>(ImagesController)
    imagesService = module.get<ImageService>(ImageService)
  })

  describe('root', () => {
    it('should return an array of images', async () => {
      const result = galleryMockResponse.data
      const options = new GetGalleryOptions()

      const spy = jest.spyOn(axios, 'get').mockImplementation(() => ({
        data: galleryMockResponse
      }))

      const response = await imagesController.root(options)

      expect(response).toBe(result)
      expect(Array.isArray(response)).toBeTruthy()
      expect(response).toHaveLength(4)
      spy.mockClear()
    })

    it('should be called with proper arguments', async () => {
      const options = new GetGalleryOptions()
      options.subreddit = 'aww'
      options.page = 3

      const spy = jest
        .spyOn(imagesService, 'fetchSubredditGallery')
        .mockImplementation(() => null)

      const response = await imagesController.root(options)
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

      const payload: CreateImagePayload = {
        description: 'desc',
        name: 'name',
        title: 'title'
      }

      const spy = jest.spyOn(axios, 'post').mockImplementation(() => ({
        data: {}
      }))

      imagesController.upload(file, payload)
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
