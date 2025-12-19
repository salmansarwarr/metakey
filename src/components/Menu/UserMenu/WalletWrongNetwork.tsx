import styled from 'styled-components'
import { useTranslation } from '@pancakeswap/localization'
import { Button, Text, Link, HelpIcon } from '@pancakeswap/uikit'
import { useSwitchChain } from 'wagmi'
import { ChainId } from '@pancakeswap/sdk'

const StyledLink = styled(Link)`
  width: 100%;
  &:hover {
    text-decoration: initial;
  }
`

interface WalletWrongNetworkProps {
  onDismiss: () => void
}

const WalletWrongNetwork: React.FC<React.PropsWithChildren<WalletWrongNetworkProps>> = ({ onDismiss }) => {
  const { t } = useTranslation()
  const { switchChainAsync } = useSwitchChain()

  const handleSwitchNetwork = async (): Promise<void> => {
    await switchChainAsync({ chainId: ChainId.BSC })
    onDismiss?.()
  }

  return (
    <>
      <Text mb="24px">{t('You’re connected to the wrong network.')}</Text>
      <Button onClick={handleSwitchNetwork} mb="24px">
        {t('Switch Network')}
      </Button>
      <StyledLink href="https://support.metamask.io/more-web3/dapps/connecting-to-a-dapp" external>
        <Button width="100%" variant="secondary">
          {t('Learn How')}
          <HelpIcon color="primary" ml="6px" />
        </Button>
      </StyledLink>
    </>
  )
}

export default WalletWrongNetwork
