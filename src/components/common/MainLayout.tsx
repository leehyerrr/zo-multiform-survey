import type { PropsWithChildren } from 'react'

function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-full flex justify-center bg-bg overflow-scroll">
      <main className="max-w-655 w-full">{children}</main>
    </div>
  )
}

export default MainLayout
