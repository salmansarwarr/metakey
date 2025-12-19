// @ts-nocheck
import {
  arbitrumSepolia, // Changed from arbitrumRinkeby
  optimismSepolia, // Changed from optimismKovan
  polygonMumbai,
  sepolia, // Changed from rinkeby
  mainnet as defaultMainnet,
  goerli as defaultGoerli,
  arbitrum,
  optimism,
  polygon,
  Chain,
} from 'wagmi/chains'

export const avalandche: Chain = {
  id: 43114,
  name: 'Avalanche C-Chain',
  network: 'avalanche',
  rpcUrls: {
    default: { http: ['https://rpc.ankr.com/avalanche'] },
    public: { http: ['https://rpc.ankr.com/avalanche'] },
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://snowtrace.io/',
    },
  },
}

export const avalandcheFuji: Chain = {
  id: 43113,
  name: 'Avalanche Fuji',
  network: 'avalanche-fuji',
  rpcUrls: {
    default: { http: ['https://rpc.ankr.com/avalanche_fuji'] },
    public: { http: ['https://rpc.ankr.com/avalanche_fuji'] },
  },
  nativeCurrency: { name: 'Avalanche', symbol: 'AVAX', decimals: 18 },
  blockExplorers: {
    default: {
      name: 'snowtrace',
      url: 'https://testnet.snowtrace.io/',
    },
  },
  testnet: true,
}

export const fantomOpera: Chain = {
  id: 250,
  name: 'Fantom Opera',
  network: 'fantom',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.ftm.tools'] },
    public: { http: ['https://rpc.ftm.tools'] },
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://ftmscan.com',
    },
  },
}

export const fantomTestnet: Chain = {
  id: 4002,
  name: 'Fantom Testnet',
  network: 'fantom-testnet',
  nativeCurrency: { name: 'Fantom', symbol: 'FTM', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.testnet.fantom.network'] },
    public: { http: ['https://rpc.testnet.fantom.network'] },
  },
  blockExplorers: {
    default: {
      name: 'FTMScan',
      url: 'https://testnet.ftmscan.com',
    },
  },
  testnet: true,
}

const bscExplorer = { name: 'BscScan', url: 'https://bscscan.com' }

export const bsc: Chain = {
  id: 56,
  name: 'BNB Smart Chain',
  network: 'bsc',
  rpcUrls: {
    default: { http: ['https://bsc-dataseed1.binance.org'] },
    public: { http: ['https://bsc-dataseed1.binance.org'] },
  },
  blockExplorers: {
    default: bscExplorer,
    etherscan: bscExplorer,
  },
  nativeCurrency: {
    name: 'Binance Chain Native Token',
    symbol: 'BNB',
    decimals: 18,
  },
  contracts: {
    multicall3: {
      address: '0x72dba3Fa54C73D9EDB493e9F4eDf884439B1eBC4',
      blockCreated: 20455688,
    },
  },
}

export const bscTest: Chain = {
  id: 97,
  name: 'BNB Smart Chain Testnet',
  network: 'bsc-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance Chain Native Token',
    symbol: 'tBNB',
  },
  rpcUrls: {
    default: { http: ['https://data-seed-prebsc-1-s2.binance.org:8545/'] },
    public: { http: ['https://data-seed-prebsc-1-s2.binance.org:8545/'] },
    nodeReal: { http: ['https://bsc-testnet.nodereal.io/v1/e9a36765eb8a40b9bd12e680a1fd2bc5'] },
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
  },
  contracts: {
    multicall3: {
      address: '0xb66a4fE12138C4391A98F29E34EFE4Cc7A445AE5',
      blockCreated: 21965366,
    },
  },
  testnet: true,
}

// Sepolia replaced Rinkeby
// const sepolia: Chain = {
//   ...defaultSepolia,
//   rpcUrls: {
//     ...defaultSepolia.rpcUrls,
//     nodeReal: { http: ['https://eth-sepolia.nodereal.io/v1/a4da384bf3334c5ea992eb0bf44135e0'] },
//   },
// }

const mainnet: Chain = {
  ...defaultMainnet,
  rpcUrls: {
    ...defaultMainnet.rpcUrls,
    nodeReal: { http: ['https://eth-mainnet.nodereal.io/v1/1659dfb40aa24bbb8153a677b98064d7'] },
  },
}

const goerli: Chain = {
  ...defaultGoerli,
  rpcUrls: {
    ...defaultGoerli.rpcUrls,
    nodeReal: { http: ['https://eth-goerli.nodereal.io/v1/8a4432e42df94dcca2814fde8aea2a2e'] },
  },
}

export const CHAINS_TESTNET = [
  bscTest,
  sepolia, // Changed from rinkeby
  arbitrumSepolia, // Changed from arbitrumRinkeby
  optimismSepolia, // Changed from optimismKovan
  polygonMumbai,
  avalandcheFuji,
  fantomTestnet,
]

export const CHAINS = [
  bsc,
  // mainnet, // Uncomment if needed
]

export const CHAIN_IDS = CHAINS.map((c) => c.id)
export const CHAINS_STARGATE = [mainnet, arbitrum, optimism, polygon, avalandche, fantomOpera]