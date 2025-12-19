import { Web3Provider } from '@ethersproject/providers'
import { createContext, useContext } from 'react'
import useSWRImmutable from 'swr/immutable'
import { WagmiProvider as WagmiConfigProvider } from 'wagmi'
import { useAccount, usePublicClient, useChainId } from 'wagmi'

const Web3LibraryContext = createContext<Web3Provider | undefined>(undefined)

export const useWeb3LibraryContext = () => {
  return useContext(Web3LibraryContext)
}

export const Web3LibraryProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { address } = useAccount()
  const chainId = useChainId()
  const client = usePublicClient()

  const { data: library } = useSWRImmutable(client && chainId ? ['web3-library', address, chainId] : null, async () => {
    if (!client) return undefined
    const { chain, transport } = client
    const network = {
      chainId: chain.id,
      name: chain.name,
      ensAddress: chain.contracts?.ensRegistry?.address,
    }
    const provider = new Web3Provider(transport, network)
    return provider
  })

  return <Web3LibraryContext.Provider value={library}>{children}</Web3LibraryContext.Provider>
}

export function WagmiProvider({ children, config }: { children: React.ReactNode; config: any }) {
  return (
    <WagmiConfigProvider config={config}>
      <Web3LibraryProvider>{children}</Web3LibraryProvider>
    </WagmiConfigProvider>
  )
}
