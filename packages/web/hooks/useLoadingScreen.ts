import { RecoilAtomKeys } from '@web/state/recoilKeys'

import { atom, useRecoilState } from 'recoil'

type LoadingScreenState = {
  isLoading: boolean
  message: string
}

const state = atom<LoadingScreenState>({
  key: RecoilAtomKeys.LOADING_SCREEN,
  default: {
    isLoading: false,
    message: '',
  },
})

export const useLoadingScreen = () => {
  const [loadingScreen, setLoadingScreen] = useRecoilState(state)

  const enableLoading = (message = 'ローディング中...') =>
    setLoadingScreen({
      isLoading: true,
      message,
    })
  const disableLoading = () =>
    setLoadingScreen({ isLoading: false, message: '' })

  return {
    enableLoading,
    disableLoading,
    ...loadingScreen,
  }
}
