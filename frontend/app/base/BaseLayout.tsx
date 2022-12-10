import { PropsWithChildren } from 'react'
import { Aside } from './Aside'
import { Header } from './Header'
import '../../styles/base/layout.scss'

const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="content-wrapper flex">
      <Aside />
      <div className="main-part lg:px-16 mt-10">
        <Header />
        <main className="main">{children}</main>
      </div>
    </div>
  )
}

export { BaseLayout }
