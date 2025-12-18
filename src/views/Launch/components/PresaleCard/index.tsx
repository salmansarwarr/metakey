import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@pancakeswap/wagmi'
import { parseUnits } from 'ethers/lib/utils'
import { ethers } from 'ethers'
import { Card, CardBody, Text, Heading, BaseLayout, Button, LinkExternal, Progress, Flex, Image, useModal, Input } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'
import { Launch, LaunchStatus } from 'config/constants/types'
import { usePresale } from 'hooks/useContract'
import { useFetchLaunch, useLaunch } from 'state/launch/hooks'
import { getBscScanLink } from 'utils'
import truncateHash from 'utils/truncateHash'
import { getAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import ConnectWalletButton from 'components/ConnectWalletButton'
import CopyAddress from 'components/Menu/UserMenu/CopyAddress'
import useValidateReferralId from 'views/Launch/hooks/useValidateReferralId'
import Web3 from 'web3'
import ContributeModal from './ContributeModal'
// import LaunchTime from './LaunchTime'
import useContribute from '../../hooks/useContribute'
import useClaim from '../../hooks/useClaim'
import useRefund from '../../hooks/useRefund'




const PresaleCardWrapper = styled(Card)`
  width: 100%;
  min-height: 880px;
  margin: 0 auto;
  padding: 0px 0;
`

const TokenImage = styled.img`
  margin-right: 20px;
`

const StyledProgress = styled(Progress)`
  margin-top: 20px;
  width: 100%;
`

const ExternalLink = styled(LinkExternal)`
  color: ${({ theme }) => theme.colors.text};
  font-weight: normal;
  font-size: 20px;

  svg {
    fill: ${({ theme }) => theme.colors.text};
  }
`

const StyledBoxIntroCtrl = styled(Flex)`
  -webkit-flex-direction: column;
  width: 100%;
  margin-top: 20px;
  align-items: center;
  font-size: 1.2rem;
  color: #ee32ef;
  cursor: pointer;
`

const StyledBoxIntro = styled(Flex)`
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  padding: 15px;
  margin-top: 20px;
  font-size: 1.2rem;
`

const StyledBox = styled(Flex)`
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  padding: 15px;
  margin-top: 20px;
`

const StyledCountBox = styled(Flex)`
  width: 100%;
  justify-content: center;
  border-radius: 10px;
  background-color: #54b0de;
  border: 3px solid #54b0de;
  padding: 15px;
  margin-top: 20px;
  margin-bottom: 10px;
`


export interface PresaleCardProps {
  launch: Launch
}


const getValueAsEthersBn = (amount: string) => {
  const valueAsFloat = parseFloat(amount)
  return Number.isNaN(valueAsFloat) ? ethers.BigNumber.from(0) : parseUnits(amount)
}


const getRef = () => {
    const query = window.location.href;
    const string = query.substring(32,74)
    const ref = Web3.utils.isAddress(string)
      ? string
      : "";
    return ref;
  };

const getStatus = (currentTime: number, startTime: number, endTime: number): LaunchStatus | null => {
  if (currentTime < startTime) {
    return 'coming_soon'
  }

  if (currentTime >= startTime && currentTime <= endTime) {
    return 'live'
  }

  if (currentTime > endTime) {
    return 'finished'
  }

  return null
}

const PresaleCard: React.FC<PresaleCardProps> = ({launch}) => {
  const { t } = useTranslation()
  const { account} = useWeb3React()
  const {id, address, isActive, symbol, name, currency, presaleAddress, tokenDecimals, maxContribution, minContribution, soft, hard, price} = launch
  const presaleContract = usePresale()
  const { onContributeWithReferral, onContributeWithoutReferral } = useContribute()
  const { onClaim } = useClaim()
  const { onRefund } = useRefund()
  const { launch: launchData } = useLaunch()
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(null)
  const [progress, setProgress] = useState(0)
  const [softPercent, setSoftPercent] = useState(0)
  const [hardPercent, setHardPercent] = useState(0)
  const [softCapReached, setSoftCapReached] = useState(true)
  const [finalized, setFinalized] = useState(false)
  const [secondsStart, setSecondsStart] = useState(0)
  const [secondsEnd, setSecondsEnd] = useState(0)
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [contribution, setContribution] = useState(0)
  const [referralBonus, setReferralBonus] = useState(0)
  const [referral, setReferral] = useState("")
  const [showIntro, setShowIntro] = useState(false)

  const referralState = useValidateReferralId(referral)
  const refAddress = getRef()
  useFetchLaunch(account)



  useEffect(() => {
    const currentTime = Math.round(Date.now() / 1000)
    if (launchData.start !== null && launchData.end !== null && launchData.balance !== null && launchData.contribution !== null && launchData.referralBonus !== null) {
      setStatus(getStatus(currentTime, launchData.start, launchData.end))
      setProgress(currentTime > launchData.start ? ((currentTime - launchData.start) / (launchData.end - launchData.start)) * 100 : ((currentTime - launchData.end) / (launchData.start - launchData.end)) * 100)
      // setSoftPercent(200 / launch.soft * 100)
      // setHardPercent(200 / launch.hard * 100)
      setSoftPercent(launchData.balance * 900 / 40000 * 100)
      setHardPercent(launchData.balance * 900 / 40000 * 100)
      setSecondsStart(launchData.start)
      setSecondsEnd(launchData.end)
      
      setLoading(false)
      setSoftCapReached(launchData.softCapReached)
      setFinalized(launchData.finalized)    
      setContribution(launchData.contribution)
      setReferralBonus(launchData.referralBonus)
    }
      
      setReferral(refAddress)
    
  }, [launch.hard, launch.soft, launchData.start, launchData.end, launchData.balance, launchData.contribution, launchData.referralBonus, launchData.softCapReached, launchData.finalized ])

  useEffect(() => {    
    const getTimeUntil = () => {
      let deadline = 0
      if(Date.now() / 1000 < secondsStart) deadline = secondsStart
      else if(Date.now() / 1000 < secondsEnd) deadline = secondsEnd
      const time = deadline * 1000 - Date.now();
      if (time < 0) {
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      } else {
        const _seconds = Math.floor((time / 1000) % 60);
        const _minutes = Math.floor((time / 1000 / 60) % 60);
        const _hours = Math.floor((time / (1000 * 60 * 60)) % 24);
        const _days = Math.floor(time / (1000 * 60 * 60 * 24));
        setDays(_days);
        setHours(_hours);
        setMinutes(_minutes);
        setSeconds(_seconds);
      }
    };
    setTimeout(() => getTimeUntil(), 1000);
  }, [secondsEnd, secondsStart, days, hours, minutes, seconds]);

  const isFinished = status === 'finished' || finalized

  const handleContribute = async (amount: string) => {
    if(referralState === 0)
      await onContributeWithReferral(amount, referral)
    else
      await onContributeWithoutReferral(amount)
  }

  const handleClaim = async () => {
    await onClaim()
  }

  const handleRefund = async () => {
    await onRefund()
  }

  const handleShowIntro = () => {
    setShowIntro(!showIntro)
  }

  const [onContributeModal] = useModal(
    <ContributeModal
      onConfirm={handleContribute}
      referral={referral}
      tokenName="BNB"
      minContribution={minContribution}
    />,
  )

  const renderActionButton = () => {
    return isFinished ? (
      // (
        // softCapReached ?
          <Button  onClick={handleClaim} mt="10px" width="200px" variant="secondary" >
            {t('Claim')}
          </Button>
        //   :
        //   <Button onClick={handleRefund} mt="10px" width="200px" variant="secondary" >
        //     {t('Refund')}
        //   </Button>
        // <Button disabled={Date.now() / 1000 < secondsStart} onClick={onContributeModal} mt="10px" width="200px" variant="secondary" >
        //   {t('Contribute')}
        // </Button>
      // )
    ) : (
      <Button disabled={Date.now() / 1000 < secondsStart} onClick={onContributeModal} mt="10px" width="200px" variant="secondary" >
        {t('Contribute')}
      </Button>
    )
  }

  const handleChangeReferral = (e) => {
      setReferral(e.target.value)
  }

  return (  
    <PresaleCardWrapper>
      <CardBody>
        <Flex alignItems="center" mb="20px">
          <TokenImage src={`/images/tokens/${id}.svg`} alt={id} width="80px" height="80px" />
          <Heading scale="xl">{t(`${symbol}`)}</Heading>
        </Flex>
        <Flex alignItems="center" justifyContent="center" mt="30px" mx="50px">
          <Flex flexDirection="column" alignItems="center" justifyContent="center" minWidth="60px" maxWidth="200px" mx="10px">
            <StyledCountBox><Text fontSize="20px" bold color='#040404'>{days}</Text></StyledCountBox>
            <Text color='grey' bold>{t('days')}</Text>
          </Flex>
          
          <Flex flexDirection="column" alignItems="center" justifyContent="center" minWidth="60px" maxWidth="200px" mx="10px">
            <StyledCountBox><Text fontSize="20px" bold color='#040404'>{hours}</Text></StyledCountBox>
            <Text color='grey'>{t('hours')}</Text>
          </Flex>
          
          <Flex flexDirection="column" alignItems="center" justifyContent="center" minWidth="60px" maxWidth="200px" mx="10px">
            <StyledCountBox><Text fontSize="20px" bold color='#040404'>{minutes}</Text></StyledCountBox>
            <Text color='grey'>{t('minutes')}</Text>
          </Flex>
          
          <Flex flexDirection="column" alignItems="center" justifyContent="center" minWidth="60px" maxWidth="200px" mx="10px">
            <StyledCountBox><Text fontSize="20px" bold color='#040404'>{seconds}</Text></StyledCountBox>
            <Text color='grey'>{t('seconds')}</Text>
          </Flex>
          
        </Flex>
        <Flex alignItems="center" justifyContent="space-between" mt="30px">
          <Text fontSize="20px">{t('Name')}</Text>
          <Text fontSize="20px">{name}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="20px">{t('Symbol')}</Text>
          <Text fontSize="20px">{symbol}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="20px">{t('Decimals')}</Text>
          <Text fontSize="20px">{tokenDecimals}</Text>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="20px">{t('Token Address')}</Text>
          <ExternalLink href={getBscScanLink(getAddress(address), 'address')}>{truncateHash(getAddress(address))}</ExternalLink>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontSize="20px">{t('PreSale Price')}</Text>
          <Text fontSize="20px">$0.0001</Text>
        </Flex>
        <StyledBoxIntroCtrl onClick={handleShowIntro}>
          {showIntro === true ? t('Hide') : t('Show')}
        </StyledBoxIntroCtrl>
        {
          showIntro === true ?
          <StyledBoxIntro>
            <p>{t('Dear Valued User,')}</p>
            <br/>
            <p>{t('Greetings from the Metakeyswap team. Under the Japan-based METAKEY Foundation, metakey INC operates.')}</p>
            <br/>
            <p>{t('First and foremost, we would like to extend our deepest gratitude for your participation in the pre-sale. The much-anticipated moment for the USDR distribution is drawing near.')}</p>
            <br/>
            <p>{t('For those who have registered, a special offer is being prepared. Please follow the steps below to get ready for the distribution:')}</p>
            <br/>
            <p>{t('Creation of the Metamask Cryptocurrency Wallet')}</p>
            <p>{t('Please refer to this guide for assistance. https://diamond.jp/crypto/defi/metamask/')}</p>
            <br/>
            <p>{t('Wallet Configuration')}</p>
            <br/>
            <p>{t('Set to the BSC chain')}</p>
            <p>{t('Confirm the USDR token setting')}</p>
            <p>{t('Set to the BSC chain')}</p>
            <p>{t('Once these steps are completed, you are all set to receive your USDR.')}</p>
            <br/>
            <p>{t('Next, please reply to this email with the following details:')}</p>
            <br/>
            <p>{t('Full Name')}</p>
            <p>{t('Address')}</p>
            <p>{t('Contact Number (mobile preferred)')}</p>
            <p>{t('Registered Email Address')}</p>
            <p>{t('Metamask BSC Chain Wallet Address')}</p>
            <br/>
            <p>{t('Upon verification, we will commence the USDR distribution process. We plan to start with an initial distribution of 10% of the total amount, followed by subsequent distributions at predetermined percentages. Please look forward to the arrival of your USDR.')}</p>
            <br/>
            <p>{t('Lastly, we kindly request you to ensure that you carefully follow and complete the steps below:')}</p>
            <br/>
            <p>{t('Wallet Creation')}</p>
            <p>{t('Configuration to the BSC Chain')}</p>
            <p>{t('USDR Token Configuration')}</p>
            <p>{t('Once again, please reply to this email with the aforementioned details.')}</p>
            <br/>
            <p>{t('info@metakeydao.fi')}</p>
            <br/>
            <p>{t('We eagerly await your response.')}</p>
            <br/>
            <p>{t('Warm regards,')}</p>
            <p>{t('Metakeyswap Team.')}</p>
          </StyledBoxIntro>
          :
          <></>
        }
        <StyledBox>
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="20px">{t('Min Contribution')}</Text>
            <Text fontSize="20px">{t(`${minContribution} BNB`)}</Text>
          </Flex>
          
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="20px">{t('Max Contribution')}</Text>
            <Text fontSize="20px">{t(`${maxContribution} BNB`)}</Text>
          </Flex>

          {/* <Flex alignItems="center" justifyContent="space-between">
            <Text fontSize="20px">{t('Soft Cap')}</Text>
            <Text fontSize="20px">{t(`${soft} BNB`)}</Text>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between" mb="10px">
            <Text fontSize="20px">{t('Hard Cap')}</Text>
            <Text fontSize="20px">{t(`${hard} BNB`)}</Text>
          </Flex> */}
          <Flex alignItems="center" justifyContent="space-between" mb="10px">
            <Text fontSize="20px">{t('Target')}</Text>
            <Text fontSize="20px">{t(`${40000} USD`)}</Text>
          </Flex>

          {/*
          <Flex alignItems="center" justifyContent="space-between" mb="10px">
            <Text fontSize="20px">{t('Sold Amount')}</Text>
            <Text fontSize="20px">{t(`${launchData.balance} BNB`)}</Text>
          </Flex>     
          */}
          

          <StyledProgress primaryStep={hardPercent} secondaryStep={softPercent}/>
          <Flex alignItems="center" justifyContent="space-between" mt="10px">
            <Text fontSize="20px">{t('Your Contribution')}</Text>
            {/* <Text fontSize="20px">{t(`${contribution ? getBalanceNumber(new BigNumber(contribution.toString())) : 0} BNB`)}</Text> */}
            <Text fontSize="20px">{t(`${contribution.toString()} BNB`)}</Text>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between" mt="10px">
            <Text fontSize="20px">{t('Token Amount')}</Text>
            {/* <Text fontSize="20px">{t(`${contribution ? getBalanceNumber(new BigNumber((contribution * launch.price).toString())) : 0} USDR`)}</Text> */}
            <Text fontSize="20px">{t(`${(contribution * launch.price).toString()} USDR`)}</Text>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between" mt="10px">
            <Text fontSize="20px">{t('Earning By Referral')}</Text>
            {/* <Text fontSize="20px">{t(`${referralBonus ? getBalanceNumber(new BigNumber((referralBonus * launch.price).toString())) : 0} USDR`)}</Text> */}
            <Text fontSize="20px">{t(`${(referralBonus * launch.price).toString()} USDR`)}</Text>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between" mt="10px">
            <Text fontSize="20px">{t('Total Claimable Tokens')}</Text>
            <Text fontSize="20px">{t(`${((referralBonus + contribution) * launch.price).toString()} USDR`)}</Text>
          </Flex>
          <Flex flexDirection="column" mt="20px">
            <Text>{t("Referred By")}</Text>
            <Input onChange={handleChangeReferral} value={referral}/>
            {referralState === 1 && <Text color="warning">{t('Invalid Referral Id')}</Text>}
          </Flex>
          <Flex alignItems="center" justifyContent="center" mt="10px">
            {!account ? <ConnectWalletButton mt="10px" width="200px" variant="secondary" /> : renderActionButton()}
          </Flex>
          <Flex flexDirection="column" mt="20px">
            <Text>{t("My Referral Id")}</Text>
            <CopyAddress account={`https://metakeyswap.com/launch/?ref=${account}`} mb="24px" />
            {/* <Flex>
              <Text>{account || ""}</Text>
              <CopyButton
                  width="16px"
                  buttonColor="yellow"
                  text={account}  
                  tooltipMessage={t('Copied')}  
                  // tooltipTop={0}
                  // tooltipRight={40}
                  tooltipFontSize={12}
                  ml="10px"
                />
            </Flex> */}  
          </Flex>
        </StyledBox>
      </CardBody>
    </PresaleCardWrapper>
  )
}

export default PresaleCard

