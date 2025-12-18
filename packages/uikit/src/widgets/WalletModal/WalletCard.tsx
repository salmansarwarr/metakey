import React from "react";
import { isDesktop, isMobile } from "react-device-detect";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import Text from "../../components/Text/Text";
import MoreHorizontal from "../../components/Svg/Icons/MoreHorizontal";
import { ButtonProps } from "../../components/Button";
import { connectorLocalStorageKey, walletConnectConfig, walletLocalStorageKey } from "./config";
import { Login, Config } from "./types";

interface Props {
  walletConfig: Config;
  login: Login;
  onDismiss: () => void;
}

const WalletButton = styled(Button).attrs({ width: "100%", variant: "text", py: "16px" })`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: auto;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
`;

interface MoreWalletCardProps extends ButtonProps {
  t: (key: string) => string;
}

export const MoreWalletCard: React.FC<React.PropsWithChildren<MoreWalletCardProps>> = ({ t, ...props }) => {
  return (
    <WalletButton variant="tertiary" {...props}>
      <MoreHorizontal width="40px" mb="8px" color="textSubtle" />
      <Text fontSize="14px">{t("More")}</Text>
    </WalletButton>
  );
};

const WalletCard: React.FC<React.PropsWithChildren<Props>> = ({ login, walletConfig, onDismiss }) => {
  const { title, icon: Icon } = walletConfig;
  
  // Helper function to check if MetaMask is available
  const isMetaMaskAvailable = () => {
    return typeof window !== "undefined" && 
           (window.ethereum?.isMetaMask || 
            (window.ethereum?.providers && window.ethereum.providers.some((p: any) => p.isMetaMask)));
  };
  
  // Helper function to build MetaMask deep link
  const getMetaMaskDeepLink = (): string => {
    if (typeof window === "undefined") return walletConfig.href || '';
    // MetaMask deep link format: https://metamask.app.link/dapp/[full-url]
    // Use the current page URL so MetaMask opens to the same page
    const currentUrl = encodeURIComponent(window.location.href);
    return `https://metamask.app.link/dapp/${currentUrl}`;
  };
  
  return (
    <WalletButton
      variant="tertiary"
      onClick={() => {
        // TW point to WC on desktop
        if (title === "Trust Wallet" && walletConnectConfig && isDesktop) {
          login(walletConnectConfig.connectorId);
          localStorage?.setItem(walletLocalStorageKey, walletConnectConfig.title);
          localStorage?.setItem(connectorLocalStorageKey, walletConnectConfig.connectorId);
          onDismiss();
          return;
        }
        
        // MetaMask mobile handling
        if (title === "Metamask") {
          const metaMaskAvailable = isMetaMaskAvailable();
          
          // On mobile, if MetaMask is not available in browser, use deep link
          if (isMobile && !metaMaskAvailable && walletConfig.href) {
            const deepLink = getMetaMaskDeepLink();
            window.location.href = deepLink;
            return;
          }
          
          // If MetaMask is not available and we have a href, open it
          if (!metaMaskAvailable && walletConfig.href) {
            window.open(walletConfig.href, "_blank", "noopener noreferrer");
            return;
          }
        }
        
        // Default behavior: try to connect
        if (!window.ethereum && walletConfig.href) {
          window.open(walletConfig.href, "_blank", "noopener noreferrer");
        } else {
          login(walletConfig.connectorId);
          localStorage?.setItem(walletLocalStorageKey, walletConfig.title);
          localStorage?.setItem(connectorLocalStorageKey, walletConfig.connectorId);
          onDismiss();
        }
      }}
      id={`wallet-connect-${title.toLowerCase()}`}
    >
      <Icon width="40px" mb="8px" />
      <Text fontSize="14px">{title}</Text>
    </WalletButton>
  );
};

export default WalletCard;
