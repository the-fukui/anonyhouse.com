import { RecoilAtomKeys } from '@web/state/recoilKeys'

import { atom } from 'recoil'

interface UserMediaState {
  stream?: MediaStream
  isMuted: Boolean
  state: 'initial' | 'pending' | 'ok' | 'error'
}

export const userMediaState = atom<UserMediaState>({
  key: RecoilAtomKeys.USER_MEDIA,
  default: {
    stream: undefined,
    isMuted: true,
    state: 'initial',
  },
})
