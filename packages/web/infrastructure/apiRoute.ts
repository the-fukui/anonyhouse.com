import { Response } from '@web/pages/api/v1/thread'
import { BodyParams } from '@web/pages/api/v1/thread.validation'

export class APIRoute {
  public constructor() {}

  public static createThread(values: BodyParams): Promise<Response> {
    return fetch('/api/v1/thread', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((res) => res.json())
  }
}
