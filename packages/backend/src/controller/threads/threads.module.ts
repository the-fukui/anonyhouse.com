import { ThreadsController } from '@backend/src/controller/threads/threads.controller'

import { Module } from '@nestjs/common'

@Module({
  controllers: [ThreadsController],
})
export class ThreadsModule {}
