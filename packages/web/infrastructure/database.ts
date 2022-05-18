import {
  Database,
  get,
  onChildAdded,
  onDisconnect,
  onValue,
  push,
  ref,
  serverTimestamp,
  set,
} from 'firebase/database'

export class DatabaseCRUD {
  private _database: Database

  public constructor(database: Database) {
    this._database = database
  }

  public get<T>({ path }: { path: string }) {
    const dbRef = ref(this._database, path)
    return get(dbRef).then((snapshot) => {
      if (snapshot.exists()) return snapshot.val() as T
      throw new Error('No data available')
    })
  }

  public onChildAdded<T>({
    path,
    callback,
  }: {
    path: string
    callback: ({ value, key }: { value: T; key: keyof T }) => void
  }) {
    const dbRef = ref(this._database, path)
    return onChildAdded(dbRef, (snapShot) => {
      if (snapShot.exists()) {
        callback({
          value: snapShot.val() as T,
          key: snapShot.key as keyof T,
        })
      }
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
    const dbRef = ref(this._database, path)
    if (addTimestamp) data = { ...data, timestamp: serverTimestamp() }
    return set(dbRef, data)
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
    const dbRef = ref(this._database, path)
    if (addTimestamp) data = { ...data, timestamp: serverTimestamp() }
    return push(dbRef, data).then((ref) => ref.key)
  }

  public removeOnDisconnect({ path }: { path: string }) {
    const dbRef = ref(this._database, path)
    onDisconnect(dbRef).remove()
  }
}
