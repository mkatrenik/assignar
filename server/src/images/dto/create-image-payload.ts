import { IsString } from 'class-validator'

export class CreateImagePayload {
  @IsString() name: string
  @IsString() title: string
  @IsString() description: string
}
