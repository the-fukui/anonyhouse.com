import { ThreadRepository } from '@web/repository/server/thread'
import { validate } from '@web/utils/validator/validator'

import {
  MAX_CAPACITY,
  MAX_TAGS_LENGTH,
  MAX_TITLE_LENGTH,
} from '@shared/constants/thread'

import short from 'short-uuid'

import { BodyParams } from './thread.validation'

export type Response = {
  ID: string
}

const handler: NextApiHandler<{}, BodyParams, Response> = async (req, res) => {
  res.setHeader('Allow', 'POST')
  const { body } = req

  //不正なメソッド
  if (req.method !== 'POST')
    return res
      .status(405)
      .json({ Error: { Message: '405 Method Not Allowed' } })

  //パラメータ不足 or 不正
  const { isValid } = validate(body, 'BodyParams')
  const isValidCapacity = body.capacity <= MAX_CAPACITY
  const isValidTitleLength =
    body.title.length <= MAX_TITLE_LENGTH && body.title.length > 0
  const isValidTagLength =
    body.tags.length <= MAX_TAGS_LENGTH && body.tags.length > 0

  if (!isValid || !isValidCapacity || !isValidTitleLength || !isValidTagLength)
    return res.status(400).json({ Error: { Message: '400 Bad Request' } })

  //recaptcha検証
  // if (process.env.NODE_ENV === 'production') {
  //   //recaptcha verify
  //   const recaptchaResult = await fetch(
  //     'https://www.google.com/recaptcha/api/siteverify',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //       body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${validatedBody.token}`,
  //     },
  //   )
  //     .then((res) => res.json())
  //     .catch((e) => res.status(400).send('error at veryfing recaptcha'))
  //   console.log(recaptchaResult.score)

  //   //Bot扱い
  //   if (recaptchaResult.score <= 0.5)
  //     return res
  //       .status(400)
  //       .json({ Eror: { Message: 'fail at veryfing recaptcha' } })
  // }

  //RTDBへ書き込み
  const ID = short.generate()

  return ThreadRepository.createThread({ data: body, ID })
    .then(() => {
      return res.status(201).json({ ID })
    })
    .catch(() => {
      return res
        .status(500)
        .json({ Error: { Message: 'internal server error' } })
    })
}

export default handler
