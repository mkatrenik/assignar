import { IsString, IsOptional, Length } from 'class-validator'

export class UploadLocalImageBody {
  @Length(1, 200)
  @IsString()
  title: string
}
