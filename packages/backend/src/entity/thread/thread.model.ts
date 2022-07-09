import { ThreadUserModel } from '@backend/dist/backend/src/entity/thread-user/thread-user.model'

export class ThreadModel {
  ID: string
  title: string
  tags: RTDB.ThreadTagUnion[]
  capacity: number
  user: ThreadUserModel[]
  timestamp: number
}
