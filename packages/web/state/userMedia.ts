import { RecoilAtomKeys, RecoilSelectorKeys } from '@web/state/recoilKeys'

import {
  RecoilValueReadOnly,
  atom,
  selectorFamily,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil'

/**
 * state
 */

type UserMediaStatus = 'initial' | 'pending' | 'ok' | 'error'
interface State {
  stream?: MediaStream
  isMuted: Boolean
  status: UserMediaStatus
}

const state = atom<State>({
  key: RecoilAtomKeys.USER_MEDIA,
  default: {
    stream: undefined,
    isMuted: true,
    status: 'initial',
  },
})

/**
 * selectors
 */

const stateSelector = <T extends keyof State>(
  key: T,
): RecoilValueReadOnly<State[T]> =>
  selectorFamily({
    key: RecoilSelectorKeys.USER_MEDIA,
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

export const useSetUserMediaState = useSetState

/**
 * getters hook
 */

const useStateValue = <T extends keyof State>(key: T): State[T] =>
  useRecoilValue(stateSelector(key))

export const useUserMediaStateValue = useStateValue
