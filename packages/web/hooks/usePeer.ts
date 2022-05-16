import { useState } from 'react'
import Peer, { Instance, SignalData } from 'simple-peer'
import { v4 as uuid } from 'uuid'

type CreatePeer = ({
  initiator,
  stream,
}: {
  initiator: boolean
  stream?: MediaStream
}) => Promise<{ data: SignalData; ID: string }>

export const usePeer = () => {
  const [peers, setPeers] = useState<{ [key: string]: Instance }>({})

  const createPeer: CreatePeer = ({ initiator, stream }) =>
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
    })

  return {
    createPeer,
    peers,
  }
}
