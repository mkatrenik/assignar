import { IsString, IsInt } from 'class-validator'
import { Type } from 'class-transformer'

export class GetLocalImagesSerchParams {
  @Type(() => Number)
  @IsInt()
  offset: number = 0

  @Type(() => Number)
  @IsInt()
  limit: number = 0
}
