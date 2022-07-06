import { ThreadModel } from '@backend/src/entities/thread/thread.model'

import { Controller, Get } from '@nestjs/common'

@Controller('threads')
export class ThreadsController {
  @Get('/')
  async findAll(): Promise<ThreadModel[]> {
    return Promise.resolve([])
  }
}
