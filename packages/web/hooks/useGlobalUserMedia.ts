import { useState } from 'react'
import { atom, useRecoilState } from 'recoil'

interface UserMediaState {
  stream?: MediaStream
  isMuted: boolean
  state: 'initial' | 'pending' | 'ok' | 'error'
}

const userMediaState = atom<UserMediaState>({
  key: 'UserMedia',
  default: {
    stream: undefined,
    isMuted: true,
    state: 'initial',
  },
})

export const useGlobalUserMedia = () => {
  const [state, setState] = useRecoilState(userMediaState)

  const getUserMedia = async () => {
    setState((_state) => ({ ..._state, state: 'pending' }))
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then((stream) => {
        setState(() => ({ stream, isMuted: false, state: 'ok' }))
      })
      .catch((e) => {
        setState((_state) => ({ ..._state, state: 'error' }))
        throw new Error(`couldn't get user media`)
      })
  }

  const toggleMute = () => {
    //ミュートのとき(isMuted = true)にミュート解除したい(track.enabled = true)
    state.stream
      ?.getTracks()
      .forEach((track) => (track.enabled = state.isMuted))
    setState((_state) => ({ ..._state, isMuted: !_state.isMuted }))
  }

  return {
    ...state,
    toggleMute,
    getUserMedia,
  }
}
