import { forwardRef, type InputHTMLAttributes } from 'react'
import cn from 'classnames'

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        'focus:border-b focus:border-b-gray-200 py-6 pl-7 pr-19 outline-none',
        'focus:border-b-gray600 focus:bg-bg2 focus:rounded-t-6 w-full',
        className,
      )}
      {...props}
    />
  )
})

export default Input
