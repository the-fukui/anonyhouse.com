namespace RTDB {
  type userID = string
  type threadID = string

  export const ThreadCategory = {
    language: ['japanese'],
    sports: ['basketball', 'football', 'baseball'],
  } as const

  type ThreadCategoryUnion =
    typeof ThreadCategory[keyof typeof ThreadCategory][number]
  interface Tree {
    threads: {
      [key: threadID]: {
        timestamp: number
        users: {
          [key: userID]: {
            avatar: string
            timestamp: number
          }
        }
      }
    }
    threadInfo: {
      [key: threadID]: {
        title: string
        category: ThreadCategoryUnion
        capacity: number
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
