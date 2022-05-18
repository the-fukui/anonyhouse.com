import {
  Database,
  get,
  onChildAdded,
  onDisconnect,
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

  public onChildAdded({
    path,
    callback,
  }: {
    path: string
    callback: (value: any) => void
  }) {
    const dbRef = ref(this._database, path)
    return onChildAdded(dbRef, (snapShpt) => {
      if (snapShpt.exists()) return callback(snapShpt.val())
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
