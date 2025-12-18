import { serializeTokens } from 'utils/serializeTokens'
import { bscTokens } from './tokens'
import { SerializedFarmConfig } from './types'

const serializedTokens = serializeTokens(bscTokens)

export const CAKE_BNB_LP_MAINNET = '0x2B0D73609c14336546Ae66869cf11FeDe1B6599e'

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
  {
    pid: 0,
    v1pid: 0,
    lpSymbol: 'MK',
    lpAddresses: {
      97: '0xCDAf21b8d0f7c17010626c18C81663f6c38D724c',
      56: '0xCDAf21b8d0f7c17010626c18C81663f6c38D724c',
    },
    AprlpAddresses: {
      97: '0xCDAf21b8d0f7c17010626c18C81663f6c38D724c',
      56: '0xCDAf21b8d0f7c17010626c18C81663f6c38D724c',
    },
    token: serializedTokens.mk,
    quoteToken: serializedTokens.mk,
  },
  {
    pid: 1,
    v1pid: 1,
    lpSymbol: 'MK-BNB LP',
    lpAddresses: {
      97: '0x2B0D73609c14336546Ae66869cf11FeDe1B6599e',
      56: CAKE_BNB_LP_MAINNET,
    },
    AprlpAddresses: {
      97: '0x2B0D73609c14336546Ae66869cf11FeDe1B6599e',
      56: CAKE_BNB_LP_MAINNET,
    },

    token: serializedTokens.mk,
    quoteToken: serializedTokens.wbnb,
  },
  {
    pid: 2,
    v1pid: 2,
    lpSymbol: 'MK-USDT LP',
    lpAddresses: {
      97: '0xfe6F6eed44D8fA128F852F2Fc69A16E4a99B3A09',
      56: '0xfe6F6eed44D8fA128F852F2Fc69A16E4a99B3A09',
    },
    AprlpAddresses: {
      97: '0xfe6F6eed44D8fA128F852F2Fc69A16E4a99B3A09',
      56: '0xfe6F6eed44D8fA128F852F2Fc69A16E4a99B3A09',
    },
    token: serializedTokens.mk,
    quoteToken: serializedTokens.usdt,
  },
  {
    pid: 3,
    v1pid: 3,
    lpSymbol: 'USDT-BNB LP',
    lpAddresses: {
      97: '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe',
      56: '0x830eCFe7cD92eEAf5fe6E3D8e21c7Abd65d446a4',
    },
    AprlpAddresses: {
      97: '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe',
      56: '0x830eCFe7cD92eEAf5fe6E3D8e21c7Abd65d446a4',
    },
    token: serializedTokens.usdt,
    quoteToken: serializedTokens.wbnb,
  },
  // {
  //   pid: 4,
  //   v1pid: 4,
  //   lpSymbol: 'USDR-MK LP',
  //   lpAddresses: {
  //     97: '0x290AA189F556D4cf03d80640F0D1D174A29856Ff',
  //     56: '0x290AA189F556D4cf03d80640F0D1D174A29856Ff',
  //   },
  //   AprlpAddresses: {
  //     97: '0x290AA189F556D4cf03d80640F0D1D174A29856Ff',
  //     56: '0x290AA189F556D4cf03d80640F0D1D174A29856Ff',
  //   },
  //   token: serializedTokens.usdr,
  //   quoteToken: serializedTokens.mk,
  // },
  // {
  //   pid: 5,
  //   v1pid: 5,
  //   lpSymbol: 'USDR-BNB LP',
  //   lpAddresses: {
  //     97: '0x14DE25325C518d465592266cF7D5041C6BD5CAB3',
  //     56: '0x14DE25325C518d465592266cF7D5041C6BD5CAB3',
  //   },
  //   AprlpAddresses: {
  //     97: '0x14DE25325C518d465592266cF7D5041C6BD5CAB3',
  //     56: '0x14DE25325C518d465592266cF7D5041C6BD5CAB3',
  //   },
  //   token: serializedTokens.usdr,
  //   quoteToken: serializedTokens.wbnb,
  // },
  // {
  //   pid: 6,
  //   v1pid: 6,
  //   lpSymbol: 'USDR-USDT LP',
  //   lpAddresses: {
  //     97: '0xE7213e122e274E5eA5F457F101B1584543504b27',
  //     56: '0xE7213e122e274E5eA5F457F101B1584543504b27',
  //   },
  //   AprlpAddresses: {
  //     97: '0xE7213e122e274E5eA5F457F101B1584543504b27',
  //     56: '0xE7213e122e274E5eA5F457F101B1584543504b27',
  //   },
  //   token: serializedTokens.usdr,
  //   quoteToken: serializedTokens.usdt,
  // },
  // {
  //   pid: 7,
  //   v1pid: 7,
  //   lpSymbol: 'MN-MK LP',
  //   lpAddresses: {
  //     97: '0x5bD78eD9201af30cD920628E1fE158E2a07b3BC1',
  //     56: '0x5bD78eD9201af30cD920628E1fE158E2a07b3BC1',
  //   },
  //   AprlpAddresses: {
  //     97: '0x5bD78eD9201af30cD920628E1fE158E2a07b3BC1',
  //     56: '0x5bD78eD9201af30cD920628E1fE158E2a07b3BC1',
  //   },
  //   token: serializedTokens.mn,
  //   quoteToken: serializedTokens.mk,
  // },
  // {
  //   pid: 8,
  //   v1pid: 8,
  //   lpSymbol: 'MN-BNB LP',
  //   lpAddresses: {
  //     97: '0x37632ec85c52a67feacb68e36961672a61424fd7',
  //     56: '0x37632ec85c52a67feacb68e36961672a61424fd7',
  //   },
  //   AprlpAddresses: {
  //     97: '0x37632ec85c52a67feacb68e36961672a61424fd7',
  //     56: '0x37632ec85c52a67feacb68e36961672a61424fd7',
  //   },
  //   token: serializedTokens.mn,
  //   quoteToken: serializedTokens.wbnb,
  // },
  // {
  //   pid: 9,
  //   v1pid: 9,
  //   lpSymbol: 'MN-USDT LP',
  //   lpAddresses: {
  //     97: '0x250c1c651ab843b08caafe8bb3dbada18e7ba62e',
  //     56: '0x250c1c651ab843b08caafe8bb3dbada18e7ba62e',
  //   },
  //   AprlpAddresses: {
  //     97: '0x250c1c651ab843b08caafe8bb3dbada18e7ba62e',
  //     56: '0x250c1c651ab843b08caafe8bb3dbada18e7ba62e',
  //   },
  //   token: serializedTokens.mn,
  //   quoteToken: serializedTokens.usdt,
  // },
]

export default farms
