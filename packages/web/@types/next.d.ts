type PageContainerProps<
  T extends import('next').GetStaticProps | import('next').GetServerSideProps,
> = T extends import('next').GetStaticProps
  ? import('next').InferGetStaticPropsType<T>
  : T extends import('next').GetServerSideProps
  ? import('next').InferGetServerSidePropsType<T>
  : never
type PresenterProps<T> = ReturnType<T>

type _NextApiRequest = import('next').NextApiRequest
type _NextApiResponse = import('next').NextApiResponse

interface NextApiRequest<T extends NextApiRequest['query'], K extends Object>
  extends _NextApiRequest {
  query: T
  body: K
}

type NextApiHandler<
  K extends _NextApiRequest['query'],
  T extends Object,
  P = any,
> = (
  req: NextApiRequest<K, T>,
  res: _NextApiResponse<P>,
) => void | Promise<void>
