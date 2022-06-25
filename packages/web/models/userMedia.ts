export type UserMedia = {
  status: 'initial' | 'pending' | 'ok' | 'error'
  stream: MediaStream
  isMuted: boolean
}
