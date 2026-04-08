import { createContext, useContext, useState, type PropsWithChildren } from 'react'
import cn from 'classnames'

function Tabs({ children }: PropsWithChildren) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="flex flex-col">{children}</div>
    </TabContext.Provider>
  )
}

const TabContext = createContext({
  activeTab: 0,
  setActiveTab: (_: number) => {},
})

export function TabList({ children }: PropsWithChildren) {
  return <div className="flex gap-x-20">{children}</div>
}

export function Tab({ children, index }: PropsWithChildren<{ index: number }>) {
  const { activeTab, setActiveTab } = useContext(TabContext)
  return (
    <button
      //   className={`${activeTab === index ? 'w-full' : ''}`}
      className={cn('border-b-[3px] p-14', {
        'text-main border-main': activeTab === index,
        'border-transparent text-gray-500': activeTab !== index,
      })}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  )
}

export function TabPanels({ children }: PropsWithChildren) {
  return <div className="flex-1">{children}</div>
}

export function TabPanel({ children, index }: PropsWithChildren<{ index: number }>) {
  const { activeTab } = useContext(TabContext)
  return <div hidden={index !== activeTab}>{children}</div>
}

export default Tabs
