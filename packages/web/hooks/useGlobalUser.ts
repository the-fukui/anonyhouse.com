import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

interface UserState {
  avatar?: string
}

const userMediaState = atom<UserState>({
  key: 'User',
  default: {
    avatar: undefined,
  },
})

export const useGlobalUser = () => {
  const [state, setState] = useRecoilState(userMediaState)

  const setAvatar = useCallback((avatar: string) => {
    setState((_state) => ({ ..._state, avatar }))
  }, [])

  return {
    setAvatar,
    ...state,
  }
}
