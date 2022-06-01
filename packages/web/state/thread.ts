import { RecoilAtomKeys } from '@web/state/recoilKeys'

import { atom } from 'recoil'

interface ThreadState {
  status: 'initial' | 'pending' | 'ok' | 'error'
  myID?: string
}

export const userMediaState = atom<ThreadState>({
  key: RecoilAtomKeys.THREAD,
  default: {
    status: 'initial',
    myID: undefined,
  },
})
