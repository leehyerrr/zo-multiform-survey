import type { PropsWithChildren } from 'react'

function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-full flex justify-center bg-bg overflow-auto py-60">
      <main className="max-w-655 w-full relative">{children}</main>
    </div>
  )
}

export default MainLayout
