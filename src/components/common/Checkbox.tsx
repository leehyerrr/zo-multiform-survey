import { forwardRef, type InputHTMLAttributes } from 'react'
import CheckIcon from '../../assets/icons/check_box.svg?react'
import UncheckIcon from '../../assets/icons/check_box_outline_blank.svg?react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Checkbox = forwardRef<HTMLInputElement, Props>(function Checkbox(
  { label, ...props }: Props,
  ref,
) {
  return (
    <label className="relative h-26 flex items-center">
      <input ref={ref} className={'opacity-0 w-26 peer h-26'} type="checkbox" {...props} />
      <CheckIcon className="absolute top-0 left-0 opacity-0 peer-checked:opacity-100 transtion-opacity" />
      <UncheckIcon className="absolute top-0 left-0 opacity-100 peer-checked:opacity-0 transtion-opacity" />
      <span className="pl-14">{label}</span>
    </label>
  )
})

export default Checkbox
