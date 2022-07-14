import {
  Database,
  QueryConstraint,
  endAt,
  endBefore,
  equalTo,
  get,
  limitToLast,
  onChildAdded,
  onDisconnect,
  onValue,
  orderByChild,
  orderByKey,
  orderByValue,
  push,
  query,
  ref,
  serverTimestamp,
  set,
  startAfter,
  startAt,
} from 'firebase/database'

type QueryArguments = {
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

export type WatchUsersCallback<T> = ({
  value,
}: {
  value: (ValueOf<T> & { ID: string })[]
}) => void

export type OnChildAddedCallback<T> = ({
  value,
}: {
  value: ValueOf<T> & { ID: string }
}) => void

export class DatabaseCRUD {
  private _database: Database

  public constructor(database: Database) {
    this._database = database
  }

  /**
   * query部分のみ切り出して返す
   * @param {Query[]} queryオブジェクト
   */
  private _query({
    path,
    limit = 20,
    page,
    order,
    orderBy,
    where,
  }: QueryArguments) {
    console.log('[frontend]', {
      path,
      limit,
      page,
      order,
      orderBy,
      where,
    })
    const dbRef = ref(this._database, path)

    //TODO: pageクエリ（cursor）/ order

    //クエリ
    let queries = [limitToLast(limit)]

    if (where) {
      //フィルターはorderByの結果に対して行われる
      if (orderBy && orderBy !== where.key)
        throw new Error('where.key and orderBy must be same.')

      //sort
      const sortQuery = queries
      if (where.key === 'key') sortQuery.push(orderByKey())
      else if (where.key === 'value') sortQuery.push(orderByValue())
      else sortQuery.push(orderByChild(where.key))

      //filter
      const fitlerQuery = sortQuery
      if (where.op === '==') fitlerQuery.push(equalTo(where.value))
      if (where.op === '>') fitlerQuery.push(startAfter(where.value))
      if (where.op === '>=') fitlerQuery.push(startAt(where.value))
      if (where.op === '<') fitlerQuery.push(endBefore(where.value))
      if (where.op === '<=') fitlerQuery.push(endAt(where.value))

      queries = fitlerQuery
    } else if (orderBy) {
      if (orderBy === 'key') queries.push(orderByKey())
      else if (orderBy === 'value') queries.push(orderByValue())
      else queries.push(orderByChild(orderBy))
    }

    return query(dbRef, ...queries)
  }

  public get<T>({ path }: { path: string }) {
    const dbRef = ref(this._database, path)
    return get(dbRef).then((snapshot) => {
      if (snapshot.exists())
        return {
          ...(snapshot.val() as T),
          ID: snapshot.key,
        }
      throw new Error('No data available')
    })
  }

  public list<T>(args: QueryArguments) {
    //クエリ
    const query = this._query(args)

    return get(query).then((snapshot) => {
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

  public onChildAdded<T>(
    callback: OnChildAddedCallback<T>,
    args: QueryArguments,
  ) {
    const query = this._query(args)

    return onChildAdded(query, (snapShot) => {
      if (snapShot.exists()) {
        callback({
          value: { ID: snapShot.key as keyof T, ...snapShot.val() },
        })
      }
    })
  }

  public onValue<T>(callback: WatchUsersCallback<T>, args: QueryArguments) {
    //クエリ
    const query = this._query(args)

    return onValue(query, (snapShot) => {
      if (snapShot.exists()) {
        const result: (ValueOf<T> & { ID: string })[] = []
        snapShot.forEach((childSnapShot) => {
          result.push({
            ID: childSnapShot.key,
            ...childSnapShot.val(),
          })
        })

        callback({
          value: result,
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
