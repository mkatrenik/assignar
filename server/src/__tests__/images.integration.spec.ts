import * as express from 'express'
import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { ImagesModule } from '../images/images.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import axios from 'axios'

const mockResponse = require('../images/__tests__/gallery-subreddit-mock')

describe('Images', () => {
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

  describe(`GET /api/v1/images`, () => {
    it(`should work`, async () => {
      const spy = jest
        .spyOn(axios, 'get')
        .mockImplementation(() => ({ data: mockResponse }))

      await request(server)
        .get('/api/v1/images?subreddit=aww')
        .expect(200)
        .then(res => {
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
        .get('/api/v1/images?sort=aaa')
        .expect(400)

      await request(server)
        .get('/api/v1/images?')
        .expect(400)

      await request(server)
        .get('/api/v1/images?subreddit=aww&window=foo')
        .expect(400)

      spy.mockClear()
    })
  })

  describe(`POST /api/v1/images`, () => {
    it(`should upload image`, async () => {
      const spy = jest
        .spyOn(axios, 'post')
        .mockImplementation(() => ({ data: {} }))

      await request(server)
        .post('/api/v1/images')
        .attach('image', `${__dirname}/fotolia.jpg`)
        .expect(201)

      spy.mockClear()
    })

    it(`should fail on big image`, async () => {
      const spy = jest
        .spyOn(axios, 'post')
        .mockImplementation(() => ({ data: {} }))

      await request(server)
        .post('/api/v1/images')
        .attach('image', `${__dirname}/adobestock.png`)
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
