import { Test } from '@nestjs/testing'
import { ImagesController } from '../images.controller'

describe('CatsController', () => {
  let imagesController: ImagesController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [ImagesController],
      components: []
    }).compile()

    imagesController = module.get<ImagesController>(ImagesController)
  })

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = 'Hello World!'

      expect(imagesController.root()).toBe(result)
    })
  })
})
