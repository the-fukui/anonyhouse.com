import { FirebaseModule } from '@backend/src/infrastructure/firebase/firebase.module'

import { Module } from '@nestjs/common'

import { ThreadRepository } from './thread.service'

@Module({
  imports: [FirebaseModule],
  providers: [ThreadRepository],
  exports: [ThreadRepository],
})
export class ThreadRepositoryModule {}
