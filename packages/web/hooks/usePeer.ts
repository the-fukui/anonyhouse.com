import { useState } from 'react'
import Peer, { Instance, SignalData } from 'simple-peer'
import { v4 as uuid } from 'uuid'

type CreatePeer = ({
  initiator,
  stream,
}: {
  initiator: boolean
  stream?: MediaStream
  onStream: (stream: MediaStream) => void
  onError?: (error: Error) => void
}) => Promise<{ data: SignalData; ID: string }>

type SetRemote = ({ data, ID }: { data: SignalData; ID: string }) => void

export const usePeer = () => {
  const [peers, setPeers] = useState<{ [key: string]: Instance }>({})

  const createPeer: CreatePeer = ({ initiator, stream, onStream, onError }) =>
    new Promise((resolve) => {
      const peer = new Peer({
        initiator,
        stream,
      })

      peer.on('signal', (data) => {
        const ID = uuid()
        setPeers((peers) => {
          peers[ID] = peer
          return peers
        })
        resolve({ data, ID })
      })

      peer.on('stream', onStream)

      peer.on('close', () => {
        peer.destroy()
      })

      onError && peer.on('error', onError)
    })

  const setRemote: SetRemote = ({ data, ID }) => {
    const peer = peers[ID]
    if (!peer) return

    peer.signal(data)
  }

  return {
    createPeer,
    setRemote,
    peers,
  }
}
