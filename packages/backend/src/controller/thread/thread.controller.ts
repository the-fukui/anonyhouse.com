import { CreateThreadDto } from '@backend/src/dto/thread/thread.dto'
import { ThreadModel } from '@backend/src/entity/thread/thread.model'
import { ThreadUsecase } from '@backend/src/usecase/thread/thread.service'

import { Body, Controller, Get, Param, Post } from '@nestjs/common'

@Controller('threads')
export class ThreadsController {
  constructor(private threadUsecase: ThreadUsecase) {}

  @Get('/')
  async findAll(): Promise<ThreadModel[]> {
    return this.threadUsecase.findAll()
  }

  @Get(':id')
  async get(@Param() params): Promise<ThreadModel> {
    return this.threadUsecase.get(params.id)
  }

  @Post('/')
  async create(@Body() createThreadDto: CreateThreadDto): Promise<ThreadModel> {
    return this.threadUsecase.create({ data: createThreadDto })
  }
}
