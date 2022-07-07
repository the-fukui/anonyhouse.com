import { CreateThreadDto } from '@backend/src/dto/thread/thread.dto'
import { ThreadModel } from '@backend/src/entity/thread/thread.model'

import _axios from 'axios'

const axios = _axios.create({
  baseURL: process.env.BACKEND_URL,
})

export class Backend {
  public constructor() {}

  public static getThread(ID: string): Promise<ThreadModel> {
    return axios.get(`/threads/${ID}`).then((res) => res.data)
  }

  public static getThreads(): Promise<ThreadModel[]> {
    return axios.get(`/threads`).then((res) => res.data)
  }

  public static createThread(data: CreateThreadDto): Promise<ThreadModel> {
    return axios
      .post(`/threads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((res) => res.data)
  }
}
