import BigNumber from 'bignumber.js'
import { BIG_ONE, BIG_ZERO } from 'utils/bigNumber'
import { filterFarmsByQuoteToken } from 'utils/farmsPriceHelpers'
import { SerializedFarm } from 'state/types'
import { bscTokens } from 'config/constants/tokens'

const getFarmFromTokenSymbol = (
  farms: SerializedFarm[],
  tokenSymbol: string,
  preferredQuoteTokens?: string[],
): SerializedFarm => {
  const farmsWithTokenSymbol = farms.filter((farm) => farm.token.symbol === tokenSymbol)
  const filteredFarm = filterFarmsByQuoteToken(farmsWithTokenSymbol, preferredQuoteTokens)
  return filteredFarm
}

const getFarmBaseTokenPrice = (
  farm: SerializedFarm,
  quoteTokenFarm: SerializedFarm,
  bnbPriceUsdt: BigNumber,
): BigNumber => {
  const hasTokenPriceVsQuote = Boolean(farm.tokenPriceVsQuote)

  if (farm.quoteToken.symbol === bscTokens.usdt.symbol) {
    return hasTokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (farm.quoteToken.symbol === bscTokens.wbnb.symbol) {
    return hasTokenPriceVsQuote ? bnbPriceUsdt.times(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  // We can only calculate profits without a quoteTokenFarm for USDT/BNB farms
  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  // Possible alternative farm quoteTokens:
  // UST (i.e. MIR-UST), pBTC (i.e. PNT-pBTC), BTCB (i.e. bBADGER-BTCB), ETH (i.e. SUSHI-ETH)
  // If the farm's quote token isn't USDT or WBNB, we then use the quote token, of the original farm's quote token
  // i.e. for farm PNT - pBTC we use the pBTC farm's quote token - BNB, (pBTC - BNB)
  // from the BNB - pBTC price, we can calculate the PNT - USDT price
  if (quoteTokenFarm.quoteToken.symbol === bscTokens.wbnb.symbol) {
    const quoteTokenInUsdt = bnbPriceUsdt.times(quoteTokenFarm.tokenPriceVsQuote)
    return hasTokenPriceVsQuote && quoteTokenInUsdt
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInUsdt)
      : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === bscTokens.usdt.symbol) {
    const quoteTokenInUsdt = quoteTokenFarm.tokenPriceVsQuote
    return hasTokenPriceVsQuote && quoteTokenInUsdt
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInUsdt)
      : BIG_ZERO
  }

  // Catch in case token does not have immediate or once-removed USDT/WBNB quoteToken
  return BIG_ZERO
}

const getFarmQuoteTokenPrice = (
  farm: SerializedFarm,
  quoteTokenFarm: SerializedFarm,
  bnbPriceUsdt: BigNumber,
): BigNumber => {
  if (farm.quoteToken.symbol === 'USDT') {
    return BIG_ONE
  }

  if (farm.quoteToken.symbol === 'WBNB') {
    return bnbPriceUsdt
  }

  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'WBNB') {
    return quoteTokenFarm.tokenPriceVsQuote ? bnbPriceUsdt.times(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'USDT') {
    return quoteTokenFarm.tokenPriceVsQuote ? new BigNumber(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  return BIG_ZERO
}

const getPoolsPrices = (farms: SerializedFarm[]) => {
  const bnbUsdtFarm = farms.find((farm) => farm.token.symbol === 'USDT' && farm.quoteToken.symbol === 'WBNB')
  const bnbPriceUsdt = bnbUsdtFarm.tokenPriceVsQuote ? BIG_ONE.div(bnbUsdtFarm.tokenPriceVsQuote) : BIG_ZERO
  const farmsWithPrices = farms.map((farm) => {
    const quoteTokenFarm = getFarmFromTokenSymbol(farms, farm.quoteToken.symbol)
    const tokenPriceUsdt = getFarmBaseTokenPrice(farm, quoteTokenFarm, bnbPriceUsdt)
    
    const quoteTokenPriceUsdt = getFarmQuoteTokenPrice(farm, quoteTokenFarm, bnbPriceUsdt)

    return {
      ...farm,
      tokenPriceUsdt: tokenPriceUsdt.toJSON(),
      quoteTokenPriceUsdt: quoteTokenPriceUsdt.toJSON(),
    }
  })

  return farmsWithPrices
}

export default getPoolsPrices
