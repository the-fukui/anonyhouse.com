import { RecoilAtomKeys } from '@web/state/recoilKeys'

import { useCallback } from 'react'
import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil'

import { RecoilSelectorKeys } from './recoilKeys'

/**
 * state
 */
interface ThreadState {
  status: 'initial' | 'pending' | 'ok' | 'error'
  myID?: string
  myAvatar?: string
}

const threadState = atom<ThreadState>({
  key: RecoilAtomKeys.THREAD,
  default: {
    status: 'initial',
    myID: undefined,
    myAvatar: undefined,
  },
})

/**
 * selectors
 */

const myAvatarSelector = selector<ThreadState['myAvatar']>({
  key: RecoilSelectorKeys.THREAD_MY_AVATAR,
  get: ({ get }) => get(threadState).myAvatar,
})

const myIDSelector = selector<ThreadState['myID']>({
  key: RecoilSelectorKeys.THREAD_MY_ID,
  get: ({ get }) => get(threadState).myID,
})

const statusSelector = selector<ThreadState['status']>({
  key: RecoilSelectorKeys.THREAD_STATUS,
  get: ({ get }) => get(threadState).status,
})

/**
 * actions hook
 */

export const useSetMyAvatar = () => {
  const setState = useSetRecoilState(threadState)
  return useCallback(
    (avatar: string) => setState((prev) => ({ ...prev, myAvatar: avatar })),
    [],
  )
}

/**
 * getters hook
 */

export const useMyAvatar = () => useRecoilValue(myAvatarSelector)
