import { useState } from 'react'
import { atom, useRecoilState } from 'recoil'

interface UserMediaState {
  stream?: MediaStream
  isMuted: boolean
  status: 'initial' | 'pending' | 'ok' | 'error'
}

const userMediaState = atom<UserMediaState>({
  key: 'UserMedia',
  default: {
    stream: undefined,
    isMuted: true,
    status: 'initial',
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
        setState(() => ({ stream, isMuted: false, status: 'ok' }))
      })
      .catch((e) => {
        setState((_state) => ({ ..._state, status: 'error' }))
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
    toggleMute,
    getUserMedia,
    ...state,
  }
}
