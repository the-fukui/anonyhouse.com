import { RecoilAtomKeys, RecoilSelectorKeys } from '@web/state/recoilKeys'

import {
  RecoilValueReadOnly,
  atom,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
} from 'recoil'

/**
 * state
 */

type InitialConnectArguments = {
  threadID: string
  myStream?: MediaStream
  myAvatar?: string
}

type ThreadUser = {
  ID: string
  AudioRef?: HTMLAudioElement
  avatar: string
  timestamp: number
}

interface State {
  status: 'initial' | 'pending' | 'ok' | 'error'
  myID?: string
  myAvatar?: string
  users: ThreadUser[]
  initialConnect: (args: InitialConnectArguments) => void
}

const state = atom<State>({
  key: RecoilAtomKeys.THREAD,
  default: {
    status: 'initial',
    myID: undefined,
    myAvatar: undefined,
    users: [],
    initialConnect: () => {},
  },
})

/**
 * selectors
 */

const stateSelector = <T extends keyof State>(
  key: T,
): RecoilValueReadOnly<State[T]> =>
  selectorFamily({
    key: RecoilSelectorKeys.THREAD,
    get:
      () =>
      ({ get }) =>
        get(state)[key],
  })(key)

/**
 * actions hook
 */

const useSetState = <T extends keyof State>(key: T) => {
  return useRecoilCallback(
    ({ set }) =>
      async (value: State[T]) => {
        set(state, (prev) => ({ ...prev, [key]: value }))
      },
    [],
  )
}

export const useSetThreadState = useSetState

/**
 * getters hook
 */

const useStateValue = <T extends keyof State>(key: T): State[T] =>
  useRecoilValue(stateSelector(key))

export const useThreadStateValue = useStateValue
