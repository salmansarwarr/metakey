import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { bsc, mainnet } from '@reown/appkit/networks'
import { QueryClient } from '@tanstack/react-query'

// 1. Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'fc0b7f76086b5fccf0fc5d12449e7d3e'

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// 2. Set up Wagmi adapter
export const networks = [bsc, mainnet]

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
})

// 3. Create modal
export const modal = createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'MetaKeySwap',
    description: 'DEX on BSC',
    url: 'https://metakeyswap.com',
    icons: ['https://metakeyswap.com/logo.png'],
  },
  features: {
    analytics: true,
  },
})

// 4. Export config for use in providers
export const config = wagmiAdapter.wagmiConfig