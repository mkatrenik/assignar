import * as express from 'express'
import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { ImagesModule } from '../images/images.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import axios from 'axios'
import * as fs from 'fs'
import * as jsImgGen from 'js-image-generator'

const mockResponse = require('../images/__tests__/gallery-subreddit-mock')

const generateImage = (width: number, height: number, quality = 80) => {
  return new Promise<Buffer>((resolve, reject) => {
    jsImgGen.generateImage(width, height, quality, (err, image) => {
      if (err) return reject(err)
      resolve(image.data)
    })
  })
}

describe('Imgur', () => {
  let server
  let app: INestApplication

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ImagesModule]
    }).compile()

    server = express()
    app = module.createNestApplication(server)
    app.useGlobalPipes(new ValidationPipe({ transform: true }))
    await app.init()
  })

  describe(`GET /api/v1/imgur`, () => {
    it(`should work`, async () => {
      const spy = jest
        .spyOn(axios, 'get')
        .mockImplementation(() => ({ data: mockResponse }))

      await request(server)
        .get('/api/v1/imgur?subreddit=aww')
        .expect(200)
        .then(res => {
          // console.log(res)

          expect(Array.isArray(res.body)).toEqual(true)
          expect(res.body.length).toBe(4)
        })

      spy.mockClear()
    })

    it(`should fail on incorrect query options`, async () => {
      const spy = jest
        .spyOn(axios, 'get')
        .mockImplementation(() => ({ data: mockResponse }))

      await request(server)
        .get('/api/v1/imgur?sort=aaa')
        .expect(400)

      await request(server)
        .get('/api/v1/imgur?')
        .expect(400)

      await request(server)
        .get('/api/v1/imgur?subreddit=aww&window=foo')
        .expect(400)

      spy.mockClear()
    })
  })

  describe(`POST /api/v1/imgur`, () => {
    it(`should upload image`, async () => {
      const spy = jest
        .spyOn(axios, 'post')
        .mockImplementation(() => ({ data: {} }))

      const img = await generateImage(10, 10)

      await request(server)
        .post('/api/v1/imgur')
        .attach('image', img, `fotolia.jpg`)
        .field('title', 'foo')
        .expect(201)

      spy.mockClear()
    })

    it(`should fail on big image`, async () => {
      const spy = jest
        .spyOn(axios, 'post')
        .mockImplementation(() => ({ data: {} }))

      const img = await generateImage(1200, 1200)

      await request(server)
        .post('/api/v1/imgur')
        .attach('image', img, 'foo.jpeg')
        .expect(413)
        .then(res => {
          expect(res.body.error).toContain('Payload Too Large')
        })

      spy.mockClear()
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
