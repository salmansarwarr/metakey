import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading } from '@pancakeswap/uikit'
import { useTranslation } from '@pancakeswap/localization'

const IntroductionWrapper = styled(Card)`
  min-height: 880px;
  margin: 0 auto;
  padding: 1px 0;
`
const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 40px;

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`

const Introduction: React.FC = () => {
  const { t } = useTranslation()

  return (
    <IntroductionWrapper>
      <CardBody>
        <div>
          <Heading as="h1" scale="xl" color="text" mb="24px">{t('How to take part')}</Heading>
          <Heading mb="10px">{t('Before PreSale')}:</Heading>
          <List>
            <li>
              {t('Buy BNB, be sure to have it ready in your Web-3 wallet in BSC network.')}
            </li>
            <li>{t('Open the PreSale link in your Web-3 Browser.')}</li>
            <li>{t('Wait for the PreSale to start.')}</li>
          </List>
          <Heading mb="10px">{t('During PreSale')}:</Heading>
          <List>
            <li>
              {t('While the sale is live, press the Contribute button and input the amount of BNB')}
            </li>
            <li>{t('Confirm the amount of BNB you want to invest')}</li>
          
          </List>
          
          {/* <Heading mb="10px">{t('After SoftCap is reached')}:</Heading>
          <List>
            <li>{t('200,000,000,000 USDR will be distributed to wallets who joined the presale.')}</li>
          </List>
          <Heading mb="10px">{t('After HardCap is reached')}:</Heading>
          <List>
            <li>{t('300,000,000,000 USDR will be distributed to wallets who joined the presale.')}</li>
          </List> */}
          <List>
            <li>{t('400,000,000 USDR will be distributed to wallets who joined the presale.')}</li>
          </List>
        
        </div>
      </CardBody>
    </IntroductionWrapper>
  )
}

export default Introduction