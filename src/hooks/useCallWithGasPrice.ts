import { Contract } from '@ethersproject/contracts'
import { useCallback } from 'react'
import { useGasPrice } from 'state/user/hooks'
import { calculateGasMargin } from 'utils'

function toBigNumber(value: any) {
  if (typeof value === 'bigint') {
    return value.toString()
  }
  return value
}

export function useCallWithGasPrice() {
  const gasPrice = useGasPrice()

  const callWithGasPrice = useCallback(
    async (
      contract: Contract,
      methodName: string,
      args: any[] = [],
      overrides: any = {},
    ) => {
      const tx = await contract[methodName](...args, {
        gasPrice: gasPrice ? toBigNumber(gasPrice) : undefined,
        ...overrides,
      })
      return tx
    },
    [gasPrice],
  )

  return { callWithGasPrice }
}