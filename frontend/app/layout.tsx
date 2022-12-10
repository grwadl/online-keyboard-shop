import { ProviderStore } from '../redux-providers/Provider'
import { BaseLayout } from './base/BaseLayout'
import '/styles/globals.css'
import { Quicksand } from '@next/font/google'

const quicksand = Quicksand()
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html className={quicksand.className}>
      <head />
      <body id="body" className="bg-second-color">
        <ProviderStore>
          <BaseLayout>{children}</BaseLayout>
        </ProviderStore>
      </body>
    </html>
  )
}
