import type { PropsWithChildren } from 'react'
import cn from 'classnames'

function Panel({ className, children }: PropsWithChildren<Cn>) {
  return (
    <div className={cn('flex flex-col p-20 pt-26 pb-30 bg-white rounded-10', className)}>
      {children}
    </div>
  )
}

export function PanelHeader({ className, children }: PropsWithChildren<Cn>) {
  return <div className={className}>{children}</div>
}

export function PanelBody({ className, children }: PropsWithChildren<Cn>) {
  return <div className={className}>{children}</div>
}

export function PanelFooter({ className, children }: PropsWithChildren<Cn>) {
  return (
    <>
      <hr className="border-gray-100" />
      <div className={className}>{children}</div>
    </>
  )
}

export function PanelCap({ children }: PropsWithChildren) {
  return (
    <div className="relative">
      {children && (
        <div className="inline-block px-14 pt-10 pb-6 bg-main rounded-t-10 text-[15px] text-white -mb-10">
          {children}
        </div>
      )}
      <div className="bg-main h-9 rounded-t-[5px]"></div>
    </div>
  )
}

export default Panel
