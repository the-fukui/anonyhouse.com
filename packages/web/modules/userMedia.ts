export const getUserMedia = () => {
  return navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: false,
    })
    .catch((e) => {
      throw new Error(`couldn't get user media`)
    })
}

export const toggleMute = (stream: MediaStream) => {
  stream?.getTracks().forEach((track) => (track.enabled = !track.enabled))
}
