import { Module } from '@nestjs/common'

import { Firebase } from './firebase.service'

@Module({
  providers: [Firebase],
  exports: [Firebase],
})
export class FirebaseModule {}
