import { useCallback, useRef } from 'react'
import Peer, { Instance, SignalData } from 'simple-peer'

type CreatePeer = ({
  initiator,
  stream,
}: {
  initiator: boolean
  stream?: MediaStream
  peerID: string
  onSignal: (data: SignalData, peerID: string) => void
  onStream: (stream: MediaStream, peerID: string) => void
  onError?: (error: Error, peerID: string) => void
}) => void

type SetRemote = ({
  data,
  peerID,
}: {
  data: SignalData
  peerID: string
}) => void

type RemovePeer = ({ peerID }: { peerID: string }) => void

export const usePeer = () => {
  const peers = useRef<{ [key: string]: Instance }>({})

  const createPeer: CreatePeer = ({
    initiator,
    stream,
    peerID,
    onSignal,
    onStream,
    onError,
  }) => {
    const peer = new Peer({
      initiator,
      stream,
      trickle: false,
    })

    peer.on('signal', (data) => onSignal(data, peerID))

    peer.on('stream', (stream) => onStream(stream, peerID))

    peer.on('connect', () => {
      console.log('connected!')
    })

    peer.on('close', () => {
      removePeer({ peerID })
    })

    peer.on('error', (error) => {
      console.log('on error')
      onError && onError(error, peerID)
    })

    peers.current[peerID] = peer
  }

  const setRemote: SetRemote = ({ data, peerID }) => {
    const peer = peers.current[peerID]
    if (!peer) return

    peer.signal(data)
  }

  const removePeer: RemovePeer = ({ peerID }) => {
    console.log('on close')
    peers.current[peerID]?.destroy()
    delete peers.current[peerID]
  }

  return {
    createPeer,
    setRemote,
    removePeer,
  }
}
