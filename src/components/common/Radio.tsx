import { forwardRef, type InputHTMLAttributes } from 'react'
import CheckIcon from '../../assets/icons/radio_button_checked.svg?react'
import UncheckIcon from '../../assets/icons/radio_button_unchecked.svg?react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const Radio = forwardRef<HTMLInputElement, Props>(function Radio({ label, ...props }: Props, ref) {
  return (
    <label className="relative h-26 flex items-center">
      <input ref={ref} className={'opacity-0 w-26 peer h-26'} type="radio" {...props} />
      <CheckIcon className="absolute top-0 left-0 opacity-0 peer-checked:opacity-100 transtion-opacity" />
      <UncheckIcon className="absolute top-0 left-0 opacity-100 peer-checked:opacity-0 transtion-opacity" />
      <span className="pl-14">{label}</span>
    </label>
  )
})

export default Radio
