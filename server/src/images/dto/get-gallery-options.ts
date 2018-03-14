import {
  IsString,
  IsInt,
  IsEnum,
  IsIn,
  IsNumber,
  IsPositive
} from 'class-validator'
import { Type } from 'class-transformer'

enum Sort {
  time,
  top
}

enum Window {
  day,
  week,
  month,
  year,
  all
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
