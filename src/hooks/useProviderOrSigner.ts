import { useMemo } from 'react'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi'
import { providers } from 'ethers'
import type { Signer } from 'ethers'
import { useActiveChainId } from './useActiveChainId'

// Convert viem PublicClient to ethers Provider
function publicClientToProvider(publicClient: any): providers.Provider {
  const { chain, transport } = publicClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }

  if (transport.type === 'fallback') {
    const providersList = (transport.transports as any[]).map(
      ({ value }) => new providers.JsonRpcProvider(value?.url, network)
    )
    return new providers.FallbackProvider(providersList)
  }

  return new providers.JsonRpcProvider(transport.url, network)
}

// Convert viem WalletClient to ethers Signer
function walletClientToSigner(walletClient: any): Signer {
  const { account, chain, transport } = walletClient
  const network = {
    chainId: chain.id,
    name: chain.name,
    ensAddress: chain.contracts?.ensRegistry?.address,
  }

  const provider = new providers.Web3Provider(transport, network)
  return provider.getSigner(account.address)
}

export const useProviderOrSigner = (withSignerIfPossible = true): Signer | providers.Provider | null => {
  const chainId = useActiveChainId()
  const publicClient = usePublicClient({ chainId })
  const { data: walletClient } = useWalletClient({ chainId })
  const accountData = useAccount()
  
  // Safely destructure with defaults
  const address = accountData?.address
  const isConnected = accountData?.isConnected ?? false
  
  return useMemo(() => {
    // If we need a signer and wallet is connected, return ethers signer
    if (withSignerIfPossible && isConnected && address && walletClient) {
      try {
        return walletClientToSigner(walletClient)
      } catch (error) {
        console.error('Failed to convert wallet client to signer:', error)
      }
    }

    // Otherwise return ethers provider for read operations
    if (publicClient) {
      try {
        return publicClientToProvider(publicClient)
      } catch (error) {
        console.error('Failed to convert public client to provider:', error)
      }
    }

    return null
  }, [address, isConnected, publicClient, walletClient, withSignerIfPossible])
}