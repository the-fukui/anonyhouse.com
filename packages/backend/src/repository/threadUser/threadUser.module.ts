import { FirebaseModule } from '@backend/src/infrastructure/firebase/firebase.module'

import { Module } from '@nestjs/common'

import { ThreadUserRepository } from './threadUser.service'

@Module({
  imports: [FirebaseModule],
  providers: [ThreadUserRepository],
  exports: [ThreadUserRepository],
})
export class ThreadUserRepositoryModule {}
