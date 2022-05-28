import { useState } from 'react'

export const useUserMedia = () => {
  const [stream, setStream] = useState<MediaStream>()
  const [error, setError] = useState<any>()
  const [isMuted, setIsMuted] = useState<Boolean>(true)

  const _getMedia = async () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false,
      })
      .then((stream) => {
        setStream(stream)
        setIsMuted(false)
      })
      .catch((e) => {
        throw new Error(`couldn't get user media`)
      })
  }

  const toggleMute = () => {
    console.log({ stream, isMuted })

    if (isMuted) {
      //ミュート解除はgetMediaしなおす
      _getMedia()
    } else {
      //ミュート
      stream?.getTracks().forEach((track) => track.stop())
    }
    setIsMuted((state) => !state)
  }

  return {
    stream,
    error,
    toggleMute,
    isMuted,
  }
}
