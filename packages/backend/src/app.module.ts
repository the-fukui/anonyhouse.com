import { ThreadsModule } from '@backend/src/controller/thread/thread.module'

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `.env.${process.env.NODE_ENV}.local`,
        '.env.local',
        `.env.${process.env.NODE_ENV}`,
        '.env',
      ],
    }),
    ThreadsModule,
  ],
})
export class AppModule {}
