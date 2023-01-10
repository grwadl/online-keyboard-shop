import React, { useEffect, useRef, useState } from 'react'
import Tab from './Tab'

type Props = {
  className?: string
  tabs: string[]
  children: React.ReactNode
}

function Tabs({ children, className, tabs }: Props) {
  const [activeTab, setActiveTab] = useState<string>(tabs[0])
  const onClickTab = (name: string) => setActiveTab(name)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const childNodes = [...ref.current.children]
    childNodes.forEach((child) =>
      child.id === activeTab ? child.classList.remove('hidden') : child.classList.add('hidden')
    )
  }, [activeTab])

  return (
    <div className={`tabs-wrapper ${className}`}>
      <div className="tabs flex gap-4">
        {tabs.map((tab) => (
          <Tab key={tab} name={tab} onClick={onClickTab} active={activeTab} />
        ))}
      </div>
      <div className="content overflow-x-hidden flex" ref={ref}>
        {children}
      </div>
    </div>
  )
}

export default Tabs
