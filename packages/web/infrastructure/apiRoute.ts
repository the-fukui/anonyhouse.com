import { BodyParams } from '@web/pages/api/v1/thread.validation'

export class APIRoute {
  public constructor() {}

  public static createThread(values: BodyParams) {
    return fetch('/api/v1/thread', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
  }
}
