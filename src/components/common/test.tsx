import { useRef } from 'react'

function Test() {
  const xx = useRef<HTMLElement>(null)
  return (
    <div>
      <div ref={xx}>ddd</div>
    </div>
  )
}

export default Test
