import { ChainId } from '@pancakeswap/sdk'
import { useRouter } from 'next/router'
import useSWRImmutable from 'swr/immutable'
import { bsc, mainnet } from 'viem/chains'
import { useAccount, useChainId } from 'wagmi'

const supportedChains = [bsc, mainnet];

export function useLocalNetworkChain() {
  const { data: sessionChainId } = useSWRImmutable('session-chain-id')
  const { query } = useRouter()

  const chainId = +(sessionChainId || query.chainId)

  if (isChainSupported(chainId)) {
    return chainId
  }

  return undefined
}

export const useActiveChainId = () => {
  const localChainId = useLocalNetworkChain()
  const { status } = useAccount()
  const mychainId = useChainId()
  const chainId = mychainId ?? localChainId ?? (status !== 'connecting' ? ChainId.BSC : undefined)
  return chainId
}
function isChainSupported(chainId: number) {
  return supportedChains.some(chain => chain.id === chainId);
}

