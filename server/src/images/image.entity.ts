import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ImageEntity {
  @PrimaryGeneratedColumn() id: number

  @Column({ length: 200 })
  title: string

  @Column('blob') image: Buffer

  @Column() mimetype: string
}
