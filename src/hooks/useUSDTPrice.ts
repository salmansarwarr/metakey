import { Currency, JSBI, Price, WNATIVE, ChainId } from '@pancakeswap/sdk'
import { CAKE, USDT } from 'config/constants/tokens'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMemo } from 'react'
import { multiplyPriceByAmount } from 'utils/prices'
import { PairState, usePairs } from './usePairs'

/**
 * Returns the price in USDT of the input currency
 * @param currency currency to compute the USDT price of
 */
export default function useUSDTPrice(currency?: Currency): Price<Currency, Currency> | undefined {
  const { chainId } = useActiveWeb3React()
  const wrapped = currency?.wrapped
  const wnative = WNATIVE[chainId] || WNATIVE[ChainId.BSC]
  const usdt = USDT[chainId] || USDT[ChainId.BSC]

  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [chainId && wrapped && wnative?.equals(wrapped) ? undefined : currency, chainId ? wnative : undefined],
      [wrapped?.equals(usdt) ? undefined : wrapped, usdt],
      [chainId ? wnative : undefined, usdt],
    ],
    [wnative, usdt, chainId, currency, wrapped],
  )
  const [[bnbPairState, bnbPair], [busdPairState, busdPair], [busdBnbPairState, busdBnbPair]] = usePairs(tokenPairs)

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined
    }
    // handle wbnb/bnb
    if (wrapped.equals(wnative)) {
      if (busdPair) {
        const price = busdPair.priceOf(wnative)
        return new Price(currency, usdt, price.denominator, price.numerator)
      }
      return undefined
    }
    // handle usdt
    if (wrapped.equals(usdt)) {
      return new Price(usdt, usdt, '1', '1')
    }

    const bnbPairBNBAmount = bnbPair?.reserveOf(wnative)
    const bnbPairBNBUSDTValue: JSBI =
      bnbPairBNBAmount && busdBnbPair ? busdBnbPair.priceOf(wnative).quote(bnbPairBNBAmount).quotient : JSBI.BigInt(0)

    // all other tokens
    // first try the usdt pair
    if (busdPairState === PairState.EXISTS && busdPair && busdPair.reserveOf(usdt).greaterThan(bnbPairBNBUSDTValue)) {
      const price = busdPair.priceOf(wrapped)
      return new Price(currency, usdt, price.denominator, price.numerator)
    }
    if (bnbPairState === PairState.EXISTS && bnbPair && busdBnbPairState === PairState.EXISTS && busdBnbPair) {
      if (busdBnbPair.reserveOf(usdt).greaterThan('0') && bnbPair.reserveOf(wnative).greaterThan('0')) {
        const bnbUsdtPrice = busdBnbPair.priceOf(usdt)
        const currencyBnbPrice = bnbPair.priceOf(wnative)
        const busdPrice = bnbUsdtPrice.multiply(currencyBnbPrice).invert()
        return new Price(currency, usdt, busdPrice.denominator, busdPrice.numerator)
      }
    }

    return undefined
  }, [
    currency,
    wrapped,
    chainId,
    wnative,
    usdt,
    bnbPair,
    busdBnbPair,
    busdPairState,
    busdPair,
    bnbPairState,
    busdBnbPairState,
  ])
}

export const useCakeUsdtPrice = (): Price<Currency, Currency> | undefined => {
  const { chainId } = useActiveWeb3React()
  const cakeUsdtPrice = useUSDTPrice(CAKE[chainId])
  return cakeUsdtPrice
}

export const useUSDTCurrencyAmount = (currency?: Currency, amount?: number): number | undefined => {
  const busdPrice = useUSDTPrice(currency)
  if (!amount) {
    return undefined
  }
  if (busdPrice) {
    return multiplyPriceByAmount(busdPrice, amount)
  }
  return undefined
}

export const useUSDTCakeAmount = (amount: number): number | undefined => {
  const cakeUsdtPrice = useCakeUsdtPrice()
  if (cakeUsdtPrice) {
    return multiplyPriceByAmount(cakeUsdtPrice, amount)
  }
  return undefined
}

export const useBNBUsdtPrice = (): Price<Currency, Currency> | undefined => {
  const { chainId } = useActiveWeb3React()
  const bnbUsdtPrice = useUSDTPrice(WNATIVE[chainId])
  return bnbUsdtPrice
}
