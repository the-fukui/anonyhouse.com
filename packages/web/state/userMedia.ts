import { atom } from 'recoil'

interface UserMediaState {
  stream?: MediaStream
  isMuted: Boolean
  state: 'initial' | 'pending' | 'ok' | 'error'
}

export const userMediaState = atom<UserMediaState>({
  key: 'UserMedia',
  default: {
    stream: undefined,
    isMuted: true,
    state: 'initial',
  },
})
