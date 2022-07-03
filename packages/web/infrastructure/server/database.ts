import { Database } from 'firebase-admin/database'
import { serverTimestamp } from 'firebase/database'

type ListArguments = {
  path: string
  limit?: number
  page?: number
  orderBy?: 'key' | 'value' | string
  order?: 'asc' | 'desc'
  where?: {
    key: 'key' | 'value' | string
    value: string | number
    op: '==' | '<' | '>' | '<=' | '>='
  }
}

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

  public list<T>({
    path,
    limit = 20,
    page,
    order,
    orderBy,
    where,
  }: ListArguments) {
    const dbRef = this._database.ref(path)

    //TODO: pageクエリ（cursor）

    //クエリ
    let query = dbRef.limitToLast(limit)
    if (where) {
      //フィルターはorderByの結果に対して行われる
      if (orderBy && orderBy !== where.key)
        throw new Error('where.key and orderBy must be same.')

      //sort
      let sortQuery = query
      if (where.key === 'key') sortQuery = sortQuery.orderByKey()
      else if (where.key === 'value') sortQuery = sortQuery.orderByValue()
      else sortQuery = sortQuery.orderByChild(where.key)

      //filter
      let fitlerQuery = sortQuery
      if (where.op === '==') fitlerQuery = fitlerQuery.equalTo(where.value)
      if (where.op === '>') fitlerQuery = fitlerQuery.startAfter(where.value)
      if (where.op === '>=') fitlerQuery = fitlerQuery.startAt(where.value)
      if (where.op === '<') fitlerQuery = fitlerQuery.endBefore(where.value)
      if (where.op === '<=') fitlerQuery = fitlerQuery.endAt(where.value)

      query = fitlerQuery
    } else if (orderBy) {
      if (orderBy === 'key') query = query.orderByKey()
      else if (orderBy === 'value') query = query.orderByValue()
      else query.orderByChild(orderBy)
    }

    return query.get().then((snapshot) => {
      if (snapshot.exists()) {
        const result: (T & { ID: string })[] = []
        snapshot.forEach((childSnapShot) => {
          result.push({
            ID: childSnapShot.key,
            ...childSnapShot.val(),
          })
        })
        return result
      }

      return []
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
