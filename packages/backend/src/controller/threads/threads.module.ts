import { ThreadsController } from '@backend/src/controller/threads/threads.controller'
import { ThreadUsecaseModule } from '@backend/src/usecase/thread/thread.module'

import { Module } from '@nestjs/common'

@Module({
  imports: [ThreadUsecaseModule],
  controllers: [ThreadsController],
})
export class ThreadsModule {}
