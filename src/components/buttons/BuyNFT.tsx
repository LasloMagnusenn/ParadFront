"use client";

import styles from "@/styles/components/buttons/purple.module.css";
import Image from "next/image";
import { SVG } from "@/../public/static/images/svg/svg";
import { useAccount } from "wagmi";
import {
  useApproveWrite,
  useBuyNftInDisputeWrite,
} from "@/hooks/useContractWrite";
import {
  useAdminWalletAddress,
  useParadAllowance,
  useParadBalance,
  useParadDecimals,
} from "@/hooks/useContractData";
import {useEffect, useMemo, useState} from "react";
import {BuyNFTModalButton} from "@/components/modal/BuyNFT";
import {notifyError} from "@/components/Toasts";

interface BuyNFTButtonProps {
  title: string;
  topicId: number;
  debateId: number;
  answerId: number;
  price: number;
  type?: "button" | "submit" | "reset";
  isActive?: boolean;
  hideCubes?: boolean;
  isFullWidthInMobile?: boolean;
  style?: React.CSSProperties;
  tokenURI: string;
}


const isZeroAddress = (address: string) => {
  return /^0x0+$/.test(address);
};

const isEthereumAddress = (address: string) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};


export default function BuyNFTButton({
  title,
  topicId,
  debateId,
  answerId,
  price,
  type,
  isActive,
  style,
  hideCubes,
  isFullWidthInMobile,
  tokenURI
}: BuyNFTButtonProps) {
  const { address } = useAccount();

  const decimals = useParadDecimals();
  const adminWalletAddress = useAdminWalletAddress();
  const { allowance } = useParadAllowance(address);
  const { balance } = useParadBalance(address);
  const [ referrer, setReferrer ] = useState<null | string>(null);
  const [ multiplier, setMultiplier ] = useState<number>(0);


  useEffect(() => {
    if (address && adminWalletAddress) {
      const partnerAddressFromUrl = new URLSearchParams(window.location.search).get("ref");
      
      if (partnerAddressFromUrl && !isEthereumAddress(partnerAddressFromUrl as string)) {
        notifyError("Referrer address is not valid");
      }

      if (!partnerAddressFromUrl || isZeroAddress(partnerAddressFromUrl as string)) {
        setReferrer(adminWalletAddress as string);
        return;
      }

      if (address === partnerAddressFromUrl) {
        notifyError("Can not set your own address as referrer");
        return;
      }

      setReferrer(partnerAddressFromUrl);
    }
  }, [address, adminWalletAddress]);

  const formattedPrice = useMemo(() => {
    return decimals ? price * 10 ** decimals : 0;
  }, [price, decimals]);

  const { write: approveWrite, txStatus: approveTxStatus } = useApproveWrite({
    amount: formattedPrice * multiplier
  });

  const { write: buyWrite } = useBuyNftInDisputeWrite({
    topicId,
    debateId,
    answerId,
    price: formattedPrice * multiplier,
    referrer: referrer as `0x${string}`,
    tokenURI: tokenURI
  });


  const handleBuyNFT = async (multiplier: number) => {
    setMultiplier(multiplier);
  };

  useEffect(() => {
    if (approveTxStatus === "success") {
      buyWrite();
      setMultiplier(0);
    }
  }, [approveTxStatus]);

  useEffect(() => {
    if (multiplier > 0 && balance && formattedPrice && balance >= formattedPrice * multiplier) {
      if ((Number(allowance) >= formattedPrice * multiplier) && referrer) {
        buyWrite();
        setMultiplier(0);
      } else {
        approveWrite();
      }
    }
  }, [multiplier]);

  return (
        <BuyNFTModalButton
            button={
              <button
                  className={`${styles.purple__button} ${styles.purple__button__text} ${
                      isActive ? styles.active : ""
                  } ${isFullWidthInMobile ? styles.mobile_width : ""}`}
                  type={type}
                  style={style}
              >
                {!hideCubes && (
                    <Image
                        className={styles.purple__button__cubes}
                        src={SVG.hugeCubesDark}
                        alt="cubes"
                        style={{color: "black"}}
                    />
                )}
                Buy
              </button>
            }
            basePrice={price}
            formattedPrice={formattedPrice}
            handleBuyNFT={handleBuyNFT}
        />
  );
}
