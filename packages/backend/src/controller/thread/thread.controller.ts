import {
  CreateThreadDto,
  GetThreadDto,
} from '@backend/src/dto/thread/thread.dto'
import { ThreadUsecase } from '@backend/src/usecase/thread/thread.service'
import { ThreadUserUsecase } from '@backend/src/usecase/threadUser/threadUser.service'

import { Body, Controller, Get, Param, Post } from '@nestjs/common'

@Controller('threads')
export class ThreadsController {
  constructor(
    private threadUsecase: ThreadUsecase,
    private threadUserUsecase: ThreadUserUsecase,
  ) {}

  @Get('/')
  async findAll(): Promise<GetThreadDto[]> {
    const threads = await this.threadUsecase.findAll()
    const threadUsers = await this.threadUserUsecase.findByThreadIDs(
      threads.map((thread) => thread.ID),
    )

    return threads.map((thread, index) =>
      GetThreadDto.fromEntity(thread, threadUsers[index]),
    )
  }

  @Get(':id')
  async get(@Param() params): Promise<GetThreadDto> {
    const [thread, threadUsers] = await Promise.all([
      this.threadUsecase.get(params.id),
      this.threadUserUsecase.findByThreadID(params.id),
    ])
    return GetThreadDto.fromEntity(thread, threadUsers)
  }

  @Post('/')
  async create(
    @Body() createThreadDto: CreateThreadDto,
  ): Promise<GetThreadDto> {
    const thread = await this.threadUsecase.create({ data: createThreadDto })
    return GetThreadDto.fromEntity(thread, [])
  }
}
