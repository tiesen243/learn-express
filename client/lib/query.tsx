'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const QueryProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 1000 * 60 * 5 },
        },
      }),
  )
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: {
      message: string
      errors: { [key: string]: string[] }
    }
  }
}
