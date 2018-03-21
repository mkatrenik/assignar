import { IsString, IsOptional } from 'class-validator'

export class UploadImgurImageBody {
  @IsString() title: string
}
