import { IsString, IsInt, IsEnum } from 'class-validator'
import { Type } from 'class-transformer'

export enum Sort {
  time = 'time',
  top = 'top'
}

export enum Window {
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
  all = 'all'
}

export class GetGalleryOptions {
  @IsString() subreddit?: string
  @IsEnum(Sort) sort?: Sort = Sort.time

  @Type(() => Number)
  @IsInt()
  page?: number = 0

  @IsEnum(Window) window?: Window = Window.week
}
