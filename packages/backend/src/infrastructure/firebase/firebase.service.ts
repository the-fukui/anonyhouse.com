import { Injectable } from '@nestjs/common'
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getApps } from 'firebase-admin/app'
import { getDatabase } from 'firebase-admin/database'

import { DatabaseCRUD } from './database'

// NestJSはデフォルトでシングルトン
// @see https://docs.nestjs.com/fundamentals/injection-scopes
@Injectable()
export class Firebase {
  // private static _instance: FirebaseService
  public database: DatabaseCRUD

  public constructor() {
    //エミュレーター使用
    if (process.env.FIREBASE_USE_EMULATOR === 'true') {
      process.env.FIREBASE_DATABASE_EMULATOR_HOST = `localhost:${process.env.FIREBASE_EMULATOR_DATABASE_PORT}`
      console.log('use local emulator')
    }

    const app = initializeApp({
      credential: applicationDefault(),
      databaseURL: process.env.FIREBASE_DATABASE_URL || undefined,
      projectId: process.env.FIREBASE_PROJECT_ID || undefined,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET || undefined,
    })

    this.database = new DatabaseCRUD(getDatabase(app))
  }
}
