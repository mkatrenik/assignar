import { Get, Controller, Query } from '@nestjs/common'
import { ImageService } from './images.service'

@Controller('/api/v1/images')
export class ImagesController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  async root(
    @Query('subreddit') subreddit,
    @Query('sort') sort,
    @Query('page') page,
    @Query('window') window
  ) {
    return await this.imageService.fetchSubredditGallery({
      page,
      sort,
      subreddit,
      window
    })
  }
}
