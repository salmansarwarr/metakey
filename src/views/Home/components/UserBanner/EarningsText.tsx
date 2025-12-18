import { ContextApi } from '@pancakeswap/localization'
import BigNumber from 'bignumber.js'

export const getEarningsText = (
  numFarmsToCollect: number,
  hasCakePoolToCollect: boolean,
  earningsUsdt: BigNumber,
  t: ContextApi['t'],
): string => {
  const data = {
    earningsUsdt: earningsUsdt.toString(),
    count: numFarmsToCollect,
  }

  let earningsText = t('%earningsUsdt% to collect', data)

  if (numFarmsToCollect > 0 && hasCakePoolToCollect) {
    if (numFarmsToCollect > 1) {
      earningsText = t('%earningsUsdt% to collect from %count% farms and MK pool', data)
    } else {
      earningsText = t('%earningsUsdt% to collect from %count% farm and MK pool', data)
    }
  } else if (numFarmsToCollect > 0) {
    if (numFarmsToCollect > 1) {
      earningsText = t('%earningsUsdt% to collect from %count% farms', data)
    } else {
      earningsText = t('%earningsUsdt% to collect from %count% farm', data)
    }
  } else if (hasCakePoolToCollect) {
    earningsText = t('%earningsUsdt% to collect from MK pool', data)
  }

  return earningsText
}
