namespace RTDB {
  type userID = string
  type threadID = string

  interface Tree {
    threads: {
      [key: threadID]: {
        title: string
        timestamp: number
        users: {
          [key: userID]: {
            timestamp: number
          }
        }
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
