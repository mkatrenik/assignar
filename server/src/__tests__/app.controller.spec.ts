import { Test } from '@nestjs/testing'
import { AppController } from '../app.controller'

describe('CatsController', () => {
  let appController: AppController

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AppController],
      components: []
    }).compile()

    appController = module.get<AppController>(AppController)
  })

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = 'Hello World!'

      expect(appController.root()).toBe(result)
    })
  })
})
