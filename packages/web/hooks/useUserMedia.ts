import { UserMedia } from '@web/models/userMedia'
import { RecoilAtomKeys } from '@web/state/recoilKeys'

import { useEffect } from 'react'
import { atom, useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil'

const state = atom<UserMedia>({
  key: RecoilAtomKeys.USER_MEDIA,
  default: {
    stream: undefined,
    isMuted: false,
    status: 'initial',
  },
})

export const useGetUserMedia = () => {
  const userMedia = useRecoilValue(state)
  return userMedia
}

export const useUserMedia = () => {
  const [userMedia, setUserMedia] = useRecoilState(state)

  /**
   * Streamを取得する
   */
  useEffect(() => {
    setUserMedia((_state) => ({ ..._state, status: 'pending' }))

    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then((stream) =>
        setUserMedia((_state) => ({ ..._state, stream, status: 'ok' })),
      )
      .catch((e) => {
        setUserMedia((_state) => ({ ..._state, status: 'error' }))
        throw new Error(`couldn't get user media`)
      })
  }, [])

  const toggleMute = useRecoilCallback(({ snapshot }) => async () => {
    const { stream } = await snapshot.getPromise(state)
    if (stream) {
      stream.getTracks().forEach((track) => (track.enabled = !track.enabled))
    }
  })

  return {
    toggleMute,
    ...userMedia,
  }
}
