namespace RTDB {
  type userID = string
  type threadID = string

  type ThreadCategories = typeof import('../constants/thread').CATEGORIES

  type ThreadCategoryUnion = ThreadCategories[keyof ThreadCategories][number]
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
