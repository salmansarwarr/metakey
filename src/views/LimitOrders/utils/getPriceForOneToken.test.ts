import { JSBI, Token, CurrencyAmount } from '@pancakeswap/sdk'
import getPriceForOneToken from './getPriceForOneToken'

const CAKE = new Token(56, '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', 18, 'CAKE', 'PancakeSwap Token')
const USDT = new Token(56, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18, 'USDT', 'Binance USD')
const DOGE = new Token(56, '0xbA2aE424d960c26247Dd6c32edC70B295c744C43', 8, 'DOGE', 'Binance-Peg Dogecoin')

const EIGHT_DECIMALS = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(8))
const EIGHTEEN_DECIMALS = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18))
const ZERO = JSBI.multiply(JSBI.BigInt(0), EIGHTEEN_DECIMALS)
const ONE = JSBI.multiply(JSBI.BigInt(1), EIGHTEEN_DECIMALS)
const ONE_EIGHT_DEC = JSBI.multiply(JSBI.BigInt(1), EIGHT_DECIMALS)
const FIVE = JSBI.multiply(JSBI.BigInt(5), EIGHTEEN_DECIMALS)
const FIVE_EIGHT_DEC = JSBI.multiply(JSBI.BigInt(5), EIGHT_DECIMALS)

describe('limitOrders/utils/getPriceForOneToken', () => {
  describe.each([
    [CurrencyAmount.fromRawAmount(CAKE, ONE), CurrencyAmount.fromRawAmount(USDT, ONE), '1'],
    [CurrencyAmount.fromRawAmount(CAKE, FIVE), CurrencyAmount.fromRawAmount(USDT, FIVE), '1'],
    [CurrencyAmount.fromRawAmount(CAKE, ONE), CurrencyAmount.fromRawAmount(USDT, FIVE), '5'],
    [CurrencyAmount.fromRawAmount(CAKE, FIVE), CurrencyAmount.fromRawAmount(USDT, ONE), '0.2'],
    [CurrencyAmount.fromRawAmount(DOGE, ONE_EIGHT_DEC), CurrencyAmount.fromRawAmount(USDT, ONE), '1'],
    [CurrencyAmount.fromRawAmount(DOGE, FIVE_EIGHT_DEC), CurrencyAmount.fromRawAmount(USDT, FIVE), '1'],
    [CurrencyAmount.fromRawAmount(DOGE, ONE_EIGHT_DEC), CurrencyAmount.fromRawAmount(USDT, FIVE), '5'],
    [CurrencyAmount.fromRawAmount(DOGE, FIVE_EIGHT_DEC), CurrencyAmount.fromRawAmount(USDT, ONE), '0.2'],
    [CurrencyAmount.fromRawAmount(CAKE, ZERO), CurrencyAmount.fromRawAmount(USDT, ONE), undefined],
    [CurrencyAmount.fromRawAmount(CAKE, ONE), CurrencyAmount.fromRawAmount(USDT, ZERO), undefined],
  ])(`returns correct price`, (input, output, expected) => {
    it(`for ${input.toSignificant(6)} ${input.currency.symbol} -> ${output.toSignificant(6)} ${
      output.currency.symbol
    }`, () => {
      const price = getPriceForOneToken(input, output)
      expect(price?.toSignificant(6)).toBe(expected)
    })
  })
})
