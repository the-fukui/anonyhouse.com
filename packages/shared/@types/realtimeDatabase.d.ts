namespace RTDB {
  type userID = string
  type threadID = string

  type ThreadTags = typeof import('../constants/thread').TAG_ITEMS

  type ThreadTagUnion = ThreadTags[number]['slug']
  //TODO: threadとthreadInfoを一緒にする
  interface Tree {
    threads: {
      [key: threadID]: {
        timestamp: number
        title: string
        tags: ThreadTagUnion[]
        capacity: number
        users: userID[]
      }
    }
    users: {
      [key: userID]: {
        avatar: string
        thread: threadID
        timestamp: number
      }
    }
    signaling: {
      [key: userID]: {
        [key: userID]: {
          type: 'answer' | 'offer'
          sdp: string
          timestamp: number
        }
      }
    }
  }
}
