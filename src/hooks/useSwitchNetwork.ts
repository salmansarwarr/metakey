import { useCallback } from 'react'
import { useSWRConfig } from 'swr'
import { useSwitchChain } from 'wagmi'
import useActiveWeb3React from './useActiveWeb3React'

export function useSwitchNetwork() {
  const { mutate } = useSWRConfig()
  const { switchChainAsync, ...switchNetworkArgs } = useSwitchChain()
  const { account } = useActiveWeb3React()

  const switchNetwork = useCallback(
    (chainId: number) => {
      if (account && typeof switchChainAsync === 'function') {
        return switchChainAsync({ chainId }).then((c) => {
          if (c) {
            mutate('session-chain-id', c.id)
          }
        })
      }
      return mutate('session-chain-id', chainId)
    },
    [account, mutate, switchChainAsync],
  )

  return {
    ...switchNetworkArgs,
    switchNetwork,
  }
}
