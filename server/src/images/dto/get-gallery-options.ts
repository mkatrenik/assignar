import {
  IsString,
  IsInt,
  IsEnum,
  IsOptional,
  ValidateIf
} from 'class-validator'
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
  @ValidateIf(o => !o.albumId)
  @IsString()
  subreddit?: string

  @ValidateIf(o => !o.subreddit)
  @IsString()
  albumId?: string

  @IsEnum(Sort) sort?: Sort = Sort.time

  @Type(() => Number)
  @IsInt()
  page?: number = 0

  @IsEnum(Window) window?: Window = Window.week
}
