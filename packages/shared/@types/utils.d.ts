type EmptyObject = { [key: string]: never }
type ValueOf<T> = T[keyof T]
