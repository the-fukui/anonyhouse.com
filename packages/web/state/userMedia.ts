import { RecoilAtomKeys, RecoilSelectorKeys } from '@web/state/recoilKeys'

import {
  RecoilValueReadOnly,
  atom,
  selector,
  selectorFamily,
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

// const streamSelector = selector<State['stream']>({
//   key: RecoilSelectorKeys.USER_MEDIA_STREAM,
//   get: ({ get }) => get(state).stream,
// })

// const statusSelector = selector<UserMediaStatus>({
//   key: RecoilSelectorKeys.USER_MEDIA_STATUS,
//   get: ({ get }) => get(state).status,
// })

// const isMutedSelector = selector<State['isMuted']>({
//   key: RecoilSelectorKeys.USER_MEDIA_IS_MUTED,
//   get: ({ get }) => get(state).isMuted,
// })

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
  const setState = useSetRecoilState(state)
  return (value: State[T]) => setState((prev) => ({ ...prev, value }))
}

export const useSetUserMediaState = useSetState

// export const useSetStream = () => {
//   const setState = useSetRecoilState(userMediaState)
//   return (stream: MediaStream) => setState((prev) => ({ ...prev, stream }))
// }

// export const useSetStatus = () => {
//   const setState = useSetRecoilState(userMediaState)
//   return (status: UserMediaStatus) => setState((prev) => ({ ...prev, status }))
// }

/**
 * getters hook
 */

// export const useStream = () => useRecoilValue(streamSelector)
// export const useStatus = () => useRecoilValue(statusSelector)

const useStateValue = <T extends keyof State>(key: T): State[T] =>
  useRecoilValue(stateSelector(key))

export const useUserMediaStateValue = useStateValue
