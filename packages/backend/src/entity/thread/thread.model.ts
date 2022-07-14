export class ThreadModel {
  ID: string
  title: string
  tags: RTDB.ThreadTagUnion[]
  capacity: number
  timestamp: number
}
