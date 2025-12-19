import { useCallback } from 'react'
import { useAppDispatch } from 'state'
import { useDisconnect, useAccount } from 'wagmi'
import { useAppKit } from '@reown/appkit/react'
import { clearUserStates } from '../utils/clearUserStates'

const useAuth = () => {
  const dispatch = useAppDispatch()
  const { disconnect } = useDisconnect()
  const { chain } = useAccount()
  const { open } = useAppKit()

  const login = useCallback(async () => {
    await open()
  }, [open])

  const logout = useCallback(() => {
    disconnect()
    clearUserStates(dispatch, chain?.id, true)
  }, [disconnect, dispatch, chain?.id])

  return { login, logout }
}

export default useAuth