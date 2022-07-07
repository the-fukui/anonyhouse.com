import { Injectable } from '@nestjs/common'
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getApps } from 'firebase-admin/app'
import { Database, getDatabase } from 'firebase-admin/database'

import { DatabaseCRUD } from './database'

//NestJSならデフォでsingleton?

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

    const app =
      getApps().length === 0
        ? initializeApp({
            credential: applicationDefault(),
            databaseURL: process.env.FIREBASE_DATABASE_URL || undefined,
            projectId: process.env.FIREBASE_PROJECT_ID || undefined,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET || undefined,
          })
        : getApps()[0]

    this.database = new DatabaseCRUD(getDatabase(app))
  }

  // public static get instance(): FirebaseService {
  //   if (!this._instance) {
  //     this._instance = new FirebaseService()
  //   }
  //   return this._instance
  // }

  // public get database() {
  //   return new DatabaseCRUD(this._database)
  // }
}
