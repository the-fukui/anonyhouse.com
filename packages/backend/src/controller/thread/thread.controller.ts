import {
  CreateThreadDto,
  GetThreadDto,
} from '@backend/src/dto/thread/thread.dto'
import { ThreadUsecase } from '@backend/src/usecase/thread/thread.service'
import { ThreadTagUsecase } from '@backend/src/usecase/threadTag/threadTag.service'
import { ThreadUserUsecase } from '@backend/src/usecase/threadUser/threadUser.service'

import { Body, Controller, Get, Param, Post } from '@nestjs/common'

@Controller('/v1/threads')
export class ThreadsController {
  constructor(
    private threadUsecase: ThreadUsecase,
    private threadUserUsecase: ThreadUserUsecase,
    private threadTagUsecase: ThreadTagUsecase,
  ) {}

  @Get('/')
  async findAll(): Promise<GetThreadDto[]> {
    const threads = await this.threadUsecase.findAll()

    const threadUsers = await this.threadUserUsecase.findByThreadIDs(
      threads.map((thread) => thread.ID),
    )

    const threadTags = threads.map((thread) =>
      thread.tags.map((tag) => this.threadTagUsecase.get(tag)),
    )

    return threads.map((thread, index) =>
      GetThreadDto.fromEntity(thread, threadUsers[index], threadTags[index]),
    )
  }

  @Get(':id')
  async get(@Param() params): Promise<GetThreadDto> {
    const [thread, threadUsers] = await Promise.all([
      this.threadUsecase.get(params.id),
      this.threadUserUsecase.findByThreadID(params.id),
    ])

    const threadTags = thread.tags.map((tag) => this.threadTagUsecase.get(tag))

    return GetThreadDto.fromEntity(thread, threadUsers, threadTags)
  }

  @Post('/')
  async create(
    @Body() createThreadDto: CreateThreadDto,
  ): Promise<GetThreadDto> {
    const thread = await this.threadUsecase.create({ data: createThreadDto })
    const threadTags = thread.tags.map((tag) => this.threadTagUsecase.get(tag))
    return GetThreadDto.fromEntity(thread, [], threadTags)
  }
}
