import { Button, ButtonProps } from '@pancakeswap/uikit'

// @ts-ignore
// eslint-disable-next-line import/extensions
import { useActiveHandle } from 'hooks/useEagerConnect.bmp.ts'
import Trans from './Trans'
import useAuth from 'hooks/useAuth'
import { useWallet } from 'hooks/useWallet'

const ConnectWalletButton = ({ children, ...props }: ButtonProps) => {
  const { login } = useAuth()
  const handleActive = useActiveHandle()
  const { onPresentConnectModal } = useWallet()

  const handleClick = () => {
    // if (typeof __NEZHA_BRIDGE__ !== 'undefined') {
    //   handleActive()
    // } else {
    //   onPresentConnectModal()
    // }
    login();
  }

  return (
    <Button onClick={handleClick} {...props}>
      {children || <Trans>Connect Wallet</Trans>}
    </Button>
  )
}

export default ConnectWalletButton
