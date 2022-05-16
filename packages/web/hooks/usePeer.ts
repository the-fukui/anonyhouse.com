import { useState } from 'react'
import Peer, { Instance, SignalData } from 'simple-peer'
import { v4 as uuid } from 'uuid'

type CreatePeer = ({
  initiator,
  stream,
}: {
  initiator: boolean
  stream?: MediaStream
  onSignal: (data: SignalData, ID: string) => void
  onStream: (stream: MediaStream) => void
  onError?: (error: Error) => void
}) => { ID: string }

type SetRemote = ({ data, ID }: { data: SignalData; ID: string }) => void

type RemovePeer = ({ ID }: { ID: string }) => void

export const usePeer = () => {
  const [peers, setPeers] = useState<{ [key: string]: Instance }>({})

  const createPeer: CreatePeer = ({
    initiator,
    stream,
    onSignal,
    onStream,
    onError,
  }) => {
    const peer = new Peer({
      initiator,
      stream,
      trickle: false,
    })
    const ID = uuid()

    setPeers((peers) => {
      peers[ID] = peer
      return peers
    })

    peer.on('signal', onSignal)

    peer.on('stream', onStream)

    peer.on('close', () => {
      peer.destroy()
    })

    onError && peer.on('error', onError)

    return { ID }
  }

  const setRemote: SetRemote = ({ data, ID }) => {
    const peer = peers[ID]
    if (!peer) return

    peer.signal(data)
  }

  const removePeer: RemovePeer = ({ ID }) => {
    peers[ID]?.destroy()
    delete peers[ID]
  }

  return {
    createPeer,
    setRemote,
    removePeer,
    peers,
  }
}
