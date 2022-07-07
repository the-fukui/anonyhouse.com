import { ThreadModel } from '@backend/src/entities/thread/thread.model'
import { ThreadUsecase } from '@backend/src/usecase/thread/thread.service'

import { Controller, Get } from '@nestjs/common'

@Controller('threads')
export class ThreadsController {
  constructor(private threadUsecase: ThreadUsecase) {}

  @Get('/')
  async findAll(): Promise<ThreadModel[]> {
    return this.threadUsecase.findAll()
  }
}
