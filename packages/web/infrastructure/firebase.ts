import {
  Database,
  getDatabase,
  connectDatabaseEmulator,
} from 'firebase/database'
import { initializeApp } from 'firebase/app'
import { DatabaseCRUD } from './database'

export class Firebase {
  private static _instance: Firebase
  private _database: Database

  private constructor() {
    const app = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || undefined,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || undefined,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || undefined,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || undefined,
      storageBucket:
        process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || undefined,
      messagingSenderId:
        process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || undefined,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || undefined,
    })

    this._database = getDatabase(app)

    //エミュレーター使用
    if (process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true') {
      console.log('use emulator')
      connectDatabaseEmulator(
        this._database,
        'localhost',
        parseInt(process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_DATABASE_PORT),
      )
    }
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
