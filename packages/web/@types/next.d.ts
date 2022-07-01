type PageContainerProps<
  T extends import('next').GetStaticProps | import('next').GetServerSideProps,
> = T extends import('next').GetStaticProps
  ? import('next').InferGetStaticPropsType<T>
  : T extends import('next').GetServerSideProps
  ? import('next').InferGetServerSidePropsType<T>
  : never
type PresenterProps<T> = ReturnType<T>

type _NextApiRequest = import('next').NextApiRequest
type _NextApiResponse<T> = import('next').NextApiResponse<T>
type APIErrorMessage = { Error: { Message: string } }
interface NextApiRequest<T extends NextApiRequest['query'], K extends Object>
  extends _NextApiRequest {
  query: T
  body: K
}

type NextApiHandler<
  T extends _NextApiRequest['query'],
  K extends Object,
  P extends any,
> = (
  req: NextApiRequest<T, K>,
  res: _NextApiResponse<P | APIErrorMessage>,
) => void | Promise<void>
