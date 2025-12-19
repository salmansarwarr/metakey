import { ModalProvider, light, dark, MatchBreakpointsProvider } from '@pancakeswap/uikit'
import { Provider } from 'react-redux'
import { SWRConfig } from 'swr'
import { ThemeProvider } from 'styled-components'
import { LanguageProvider } from '@pancakeswap/localization'
import { ToastsProvider } from 'contexts/ToastsContext'
import { fetchStatusMiddleware } from 'hooks/useSWRContract'
import { Store } from '@reduxjs/toolkit'
import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from 'utils/wagmi'
import { HistoryManagerProvider } from 'contexts/HistoryContext'

const queryClient = new QueryClient()

const StyledThemeProvider: React.FC<React.PropsWithChildren> = ({ children, ...props }) => {
  const { resolvedTheme } = useNextTheme()
  return (
    <ThemeProvider theme={resolvedTheme === 'dark' ? dark : light} {...props}>
      {children}
    </ThemeProvider>
  )
}

const Providers: React.FC<React.PropsWithChildren<{ store: Store; children: React.ReactNode }>> = ({
  children,
  store,
}) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MatchBreakpointsProvider>
            <ToastsProvider>
              <NextThemeProvider>
                <StyledThemeProvider>
                  <LanguageProvider>
                    <SWRConfig
                      value={{
                        use: [fetchStatusMiddleware],
                      }}
                    >
                      <HistoryManagerProvider>
                        <ModalProvider>{children}</ModalProvider>
                      </HistoryManagerProvider>
                    </SWRConfig>
                  </LanguageProvider>
                </StyledThemeProvider>
              </NextThemeProvider>
            </ToastsProvider>
          </MatchBreakpointsProvider>
        </Provider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Providers