import { useEffect } from 'react'
import { useCakeUsdtPrice } from 'hooks/useUSDTPrice'

const useGetDocumentTitlePrice = () => {
  const cakePriceUsdt = useCakeUsdtPrice()
  useEffect(() => {
    const cakePriceUsdtString = cakePriceUsdt ? cakePriceUsdt.toFixed(2) : ''
    document.title = `Pancake Swap - ${cakePriceUsdtString}`
  }, [cakePriceUsdt])
}
export default useGetDocumentTitlePrice
