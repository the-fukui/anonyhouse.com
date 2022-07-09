---
name: '[@web] state'
root: '.'
output: '.'
ignore: []
questions:
  name: 'Please enter state name.'
---

# `packages/web/state/{{ inputs.name | camel }}.ts`

```ts
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

interface State {}

const state = atom<State>({
  key: RecoilAtomKeys.{{ inputs.name | snake | upper }},
  default: {},
})

/**
 * selectors
 */

const stateSelector = <T extends keyof State>(
  key: T,
): RecoilValueReadOnly<State[T]> =>
  selectorFamily({
    key: RecoilSelectorKeys.{{ inputs.name | snake | upper }},
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

export const useSet{{ inputs.name | pascal }}State = useSetState

/**
 * getters hook
 */

const useStateValue = <T extends keyof State>(key: T): State[T] =>
  useRecoilValue(stateSelector(key))

export const use{{ inputs.name | pascal }}StateValue = useStateValue

```
