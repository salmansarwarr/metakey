import { useAccount, useConnect } from 'wagmi'
import { useEffect } from 'react'

const SAFE_ID = 'safe'

const useEagerConnect = () => {
  const { connector: client } = useAccount()
  const { connectAsync, connectors } = useConnect()
  useEffect(() => {
    const connectorInstance = connectors.find((c) => c.id === SAFE_ID && c.ready)
    if (
      connectorInstance &&
      // @ts-ignore
      !window.cy
    ) {
      connectAsync({ connector: connectorInstance }).catch(() => {
        // Handle fallback or alternative logic here
        console.warn('Auto-connect is not supported on the client.')
      })
    } else {
      // Auto-connect logic is not supported; handle fallback or alternative logic here
      console.warn('Auto-connect method is not available on the client.')
    }
  }, [client, connectAsync, connectors])
}

export default useEagerConnect
