import { useState } from 'react'
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
  const [peers, setPeers] = useState<{ [key: string]: Instance }>({})

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

    setPeers((peers) => {
      peers[peerID] = peer
      return peers
    })

    peer.on('signal', (data) => onSignal(data, peerID))

    peer.on('stream', (stream) => onStream(stream, peerID))

    peer.on('close', () => {
      removePeer({ peerID })
    })

    onError && peer.on('error', (error) => onError(error, peerID))
  }

  const setRemote: SetRemote = ({ data, peerID }) => {
    const peer = peers[peerID]
    if (!peer) return

    peer.signal(data)
  }

  const removePeer: RemovePeer = ({ peerID }) => {
    peers[peerID]?.destroy()
    delete peers[peerID]
  }

  return {
    createPeer,
    setRemote,
    removePeer,
    peers,
  }
}
