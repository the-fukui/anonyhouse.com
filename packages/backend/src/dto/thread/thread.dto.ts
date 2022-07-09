import {
  MAX_CAPACITY,
  MAX_TAGS_LENGTH,
  MAX_TITLE_LENGTH,
  TAG_ITEMS,
} from '@shared/constants/thread'

import { ThreadModel } from '@backend/src/entity/thread/thread.model'
import { ThreadUserModel } from '@backend/src/entity/threadUser/threadUser.model'

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

export class GetThreadDto {
  ID: string
  title: string
  tags: RTDB.ThreadTagUnion[]
  capacity: number
  user: {
    avatar: string
  }[]
  timestamp: number

  static fromEntity(
    threadEntity: ThreadModel,
    threadUserEntities: ThreadUserModel[],
  ) {
    const Dto = new GetThreadDto()
    Dto.ID = threadEntity.ID
    Dto.title = threadEntity.title
    Dto.tags = threadEntity.tags
    Dto.capacity = threadEntity.capacity
    Dto.timestamp = threadEntity.timestamp
    Dto.user = threadUserEntities.map((user) => ({ avatar: user.avatar }))

    return Dto
  }
}

export class PostThreadDto extends GetThreadDto {}
