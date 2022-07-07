import {
  MAX_CAPACITY,
  MAX_TAGS_LENGTH,
  MAX_TITLE_LENGTH,
  TAG_ITEMS,
} from '@shared/constants/thread'

import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'

/**
 * Thread作成時のオブジェクト
 */
export class CreateThreadDto {
  @IsNotEmpty()
  @MaxLength(MAX_TITLE_LENGTH)
  @MinLength(1)
  title: string

  @IsArray()
  @ArrayMaxSize(MAX_TAGS_LENGTH)
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsIn(TAG_ITEMS.map((item) => item.slug), { each: true })
  tags: RTDB.ThreadTagUnion[]

  @IsNumber()
  @Max(MAX_CAPACITY)
  @Min(1)
  capacity: number
}
