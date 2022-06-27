import { ThreadRepository } from '@web/repository/api/thread'

import short from 'short-uuid'

// import { validate } from '~/validator/types.validator'

//JSONで送る
export interface BodyParams {
  title: string
  category: RTDB.ThreadCategoryUnion
  capacity: number
}

export interface Response {
  id: string
}

const handler: NextApiHandler<{}, BodyParams> = async (req, res) => {
  res.setHeader('Allow', 'POST')

  //不正なメソッド
  if (req.method !== 'POST')
    return res.status(405).json({ Eror: { Message: '405 Method Not Allowed' } })

  //パラメータ不足 or 不正
  const { body } = req
  // let validatedBody = null
  // try {
  //   validatedBody = validate('CreateRoomBody')(body)
  // } catch (e) {
  //   console.log(e)
  //   return res.status(400).json({ Eror: { Message: '400 Bad Request' } })
  // }

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
  const threadRepository = new ThreadRepository()

  return threadRepository
    .createThread({ data: body, ID })
    .then(() => {
      return res.status(201).json({ ID })
    })
    .catch((e) => {
      console.log(e)
      return res
        .status(500)
        .json({ Eror: { Message: 'internal server error' } })
    })
}

export default handler
