import classNames from 'classnames'

interface Props {
  direction?: 'horizontal' | 'vertical'
}

function Divider({ className, direction = 'horizontal' }: Cn<Props>) {
  if (direction === 'horizontal') {
    return <hr className={classNames('border-t w-full border-gray100', className)} />
  }
  return <hr className={classNames('border-l h-[calc(100%-3px)] mt-3 border-gray100', className)} />
}

export default Divider
