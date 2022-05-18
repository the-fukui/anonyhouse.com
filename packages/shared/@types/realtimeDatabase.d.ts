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
        offeredBy: {
          [key: userID]: {
            sdp: string
            timestamp: number
          }
        }
        answeredBy: {
          [key: userID]: {
            sdp: string
            timestamp: number
          }
        }
      }
    }
  }
}
