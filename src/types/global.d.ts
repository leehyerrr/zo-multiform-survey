// type Cn<T = unknown> = T & {
//   className?: string
// }

type Cn<T = NonNullable<unknown>> = T & {
  className?: string
}
