import { useAccount, useChainId, useChains } from 'wagmi'

export function useWeb3React() {
  const chainId = useChainId()
  const { address, connector, isConnected, isConnecting } = useAccount()
  const chains = useChains()

  // Find the matching chain
  const chain = chains.find((c) => c.id === chainId)

  return {
    chainId: chainId,
    account: isConnected ? address : null,
    isConnected,
    isConnecting,
    chain,
    connector,
  }
}