import {
  CreateThreadDto,
  GetThreadDto,
} from '@backend/src/dto/thread/thread.dto'
import { ThreadModel } from '@backend/src/entity/thread/thread.model'

import _axios from 'axios'

const axios = _axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
})

export class Backend {
  public constructor() {}

  public static getThread(ID: string): Promise<GetThreadDto> {
    return axios.get(`/threads/${ID}`).then((res) => res.data)
  }

  public static getThreads(): Promise<GetThreadDto[]> {
    return axios.get(`/threads`).then((res) => res.data)
  }

  public static createThread(data: CreateThreadDto): Promise<GetThreadDto> {
    return axios.post(`/threads`, data).then((res) => res.data)
  }
}
