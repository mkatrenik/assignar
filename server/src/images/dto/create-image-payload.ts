import { IsString, IsOptional } from 'class-validator'

export class CreateImagePayload {
  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  title: string

  @IsString()
  @IsOptional()
  description: string
}
