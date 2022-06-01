import { RecoilAtomKeys } from '@web/state/recoilKeys'

import { atom } from 'recoil'

type ThreadUser = {
  ID: string
  AudioRef?: HTMLAudioElement
  avatar: string
  timestamp: number
}

type ThreadUserState = {
  users: ThreadUser[]
}

export const threadUserState = atom<ThreadUserState>({
  key: RecoilAtomKeys.THREAD_USER,
  default: {
    users: [],
  },
})
