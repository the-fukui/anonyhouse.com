export class ThreadModel {
  ID: string
  title: string
  tags: RTDB.ThreadTagUnion[]
  capacity: number
  users: string[]
  timestamp: number
}
