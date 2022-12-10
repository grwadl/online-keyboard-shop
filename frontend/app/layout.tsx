import { ProviderStore } from '../redux-providers/Provider'
import '/styles/globals.css'
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <ProviderStore>{children}</ProviderStore>
      </body>
    </html>
  )
}
