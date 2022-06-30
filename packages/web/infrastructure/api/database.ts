import {
  Database, // get,
} from 'firebase-admin/database'
import { serverTimestamp } from 'firebase/database'

export class DatabaseCRUD {
  private _database: Database

  public constructor(database: Database) {
    this._database = database
  }

  public get<T>({ path }: { path: string }) {
    const dbRef = this._database.ref(path)
    return dbRef.get().then((snapshot) => {
      if (snapshot.exists()) return snapshot.val() as T
      throw new Error('No data available')
    })
  }

  public set<T>({
    path,
    data,
    addTimestamp = false,
  }: {
    path: string
    data: Omit<T, 'timestamp'>
    addTimestamp?: boolean
  }) {
    const dbRef = this._database.ref(path)
    if (addTimestamp) data = { ...data, timestamp: serverTimestamp() }
    return dbRef.set(data)
  }

  public push<T>({
    path,
    data,
    addTimestamp = false,
  }: {
    path: string
    data: Omit<T, 'timestamp'>
    addTimestamp?: boolean
  }) {
    const dbRef = this._database.ref(path)
    if (addTimestamp) data = { ...data, timestamp: serverTimestamp() }
    return dbRef.push(data).then((ref) => ref.key)
  }
}
