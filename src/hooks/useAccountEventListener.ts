import { useEffect } from 'react'
import { useAppDispatch } from '../state'
import { clearUserStates } from '../utils/clearUserStates'
import useActiveWeb3React from './useActiveWeb3React'

export const useAccountEventListener = () => {
  const { account, chainId, connector } = useActiveWeb3React()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (account && connector) {
      const handleUpdateEvent = () => {
        clearUserStates(dispatch, chainId)
      }

      const handleDeactiveEvent = () => {
        clearUserStates(dispatch, chainId, true)
      }

      const provider = connector.provider as any
      if (provider?.on) {
        provider.on('disconnect', handleDeactiveEvent)
        provider.on('chainChanged', handleUpdateEvent)
        provider.on('accountsChanged', handleUpdateEvent)

        return () => {
          provider.removeListener('disconnect', handleDeactiveEvent)
          provider.removeListener('chainChanged', handleUpdateEvent)
          provider.removeListener('accountsChanged', handleUpdateEvent)
        }
      }
    }
    return undefined
  }, [account, chainId, dispatch, connector])
}
