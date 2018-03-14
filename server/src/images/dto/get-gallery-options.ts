import { IsString, IsInt, IsEnum, IsPositive } from 'class-validator'
import { Type } from 'class-transformer'

enum Sort {
  time = 'time',
  top = 'top'
}

enum Window {
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
  all = 'all'
}

export class GetGalleryOptions {
  @IsString() subreddit: string
  @IsEnum(Sort) sort: Sort = Sort.time

  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page: number

  @IsEnum(Window) window: Window = Window.week
}
