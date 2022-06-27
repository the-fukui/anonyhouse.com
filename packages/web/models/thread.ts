/**
 * Client
 */

export type ThreadUser = {
  ID: string
  AudioRef?: HTMLAudioElement
  avatar: string
  timestamp: number
}

export type MyInfo = {
  ID: string
  avatar: string
}

export type Thread = {
  ID?: string
  status: 'initial' | 'pending' | 'ok' | 'error'
  myInfo?: MyInfo
  users: ThreadUser[]
}
