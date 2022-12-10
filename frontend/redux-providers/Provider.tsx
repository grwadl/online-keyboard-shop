import { useServerInsertedHTML } from 'next/navigation'
import { CssBaseline, NextUIProvider } from '@nextui-org/react'
import { PropsWithChildren } from 'react'
import { ReduxProvider } from './ReduxProvider'

const ProviderStore = ({ children }: PropsWithChildren) => {
  useServerInsertedHTML(() => {
    return <>{CssBaseline.flush()}</>
  })

  return (
    <>
      <ReduxProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </ReduxProvider>
    </>
  )
}

export { ProviderStore }
