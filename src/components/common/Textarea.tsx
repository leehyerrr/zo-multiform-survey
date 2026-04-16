import { forwardRef, type HTMLAttributes, type TextareaHTMLAttributes } from 'react'
import cn from 'classnames'
import { useWatch } from 'react-hook-form'

const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          'pt-15 border-b border-b-transparent pb-16 outline-none resize-none',
          'focus:border-b-gray200 focus:bg-bg2 focus:rounded-t-6',
          className,
        )}
        {...props}
      />
    )
  },
)

export default Textarea

export function AutoGrow({
  value,
  forTextarea = '',
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { value?: string; forTextarea?: string }) {
  const valueFromWatch = useWatch({ name: forTextarea })

  return (
    <div
      className={cn(
        'grid',
        'after:content-[attr(data-replicated-value)] after:whitespace-pre-wrap after:invisible after:pb-26 after:auto-grow',
        '[&>textarea]:auto-grow',
        className,
      )}
      {...props}
      data-replicated-value={value ?? valueFromWatch}
    />
  )
}
