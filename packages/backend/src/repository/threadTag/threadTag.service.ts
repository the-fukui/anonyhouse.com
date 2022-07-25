import { TAG_ITEMS } from '@shared/constants/thread'

import { Injectable } from '@nestjs/common'

@Injectable()
export class ThreadTagRepository {
  // constructor() {}

  get(slug: string) {
    return TAG_ITEMS.find((item) => item.slug === slug)
  }
}
