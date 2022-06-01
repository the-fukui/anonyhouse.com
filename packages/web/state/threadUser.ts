import { RecoilAtomKeys, RecoilSelectorKeys } from '@web/state/recoilKeys'

import {
  atom,
  selector,
  selectorFamily,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'

/**
 * state
 */

type ThreadUser = {
  ID: string
  AudioRef?: HTMLAudioElement
  avatar: string
  timestamp: number
}

type ThreadUserState = {
  users: ThreadUser[]
}

const threadUserState = atom<ThreadUserState>({
  key: RecoilAtomKeys.THREAD_USER,
  default: {
    users: [],
  },
})

/**
 * selectors
 */

const usersSelector = selector<ThreadUserState['users']>({
  key: RecoilSelectorKeys.THREAD_USER_USERS,
  get: ({ get }) => get(threadUserState).users,
})

const userSelector = selectorFamily<
  ThreadUserState['users'][0] | undefined,
  string
>({
  key: RecoilSelectorKeys.THREAD_USER_USERS,
  get:
    (ID) =>
    ({ get }) => {
      const users = get(threadUserState).users
      return users.find((user) => user.ID === ID)
    },
})

/**
 * actions hook
 */

export const useSetUsers = () => {
  const setState = useSetRecoilState(threadUserState)
  return (users: ThreadUser[]) => setState((prev) => ({ ...prev, users }))
}

export const useSetUser = () => {
  const setState = useSetRecoilState(threadUserState)
  return (user: ThreadUser) =>
    setState((prev) => ({ ...prev, users: prev.users.concat(user) }))
}

/**
 * getters hook
 */

export const useUsers = () => useRecoilValue(usersSelector)

export const useUser = (ID: string) => useRecoilValue(userSelector(ID))
