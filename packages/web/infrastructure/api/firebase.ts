import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getApps } from 'firebase-admin/app'
import { Database, getDatabase } from 'firebase-admin/database'

import { DatabaseCRUD } from './database'

export class Firebase {
  private static _instance: Firebase
  private _database: Database

  private constructor() {
    //エミュレーター使用
    if (process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true') {
      process.env.FIREBASE_DATABASE_EMULATOR_HOST = `localhost:${process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_DATABASE_PORT}`
      console.log('use local emulator')
    }

    const app =
      getApps().length === 0
        ? initializeApp({
            credential: applicationDefault(),
            databaseURL:
              process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || undefined,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || undefined,
            storageBucket:
              process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || undefined,
          })
        : getApps()[0]

    this._database = getDatabase(app)
  }

  public static get instance(): Firebase {
    if (!this._instance) {
      this._instance = new Firebase()
    }
    return this._instance
  }

  public get database() {
    return new DatabaseCRUD(this._database)
  }
}
