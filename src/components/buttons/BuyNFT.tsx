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
  useParadAllowance,
  useParadBalance,
  useParadDecimals,
} from "@/hooks/useContractData";
import { useEffect, useMemo } from "react";
import {BuyNFTModalButton} from "@/components/modal/BuyNFT";

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
}

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
}: BuyNFTButtonProps) {
  const { address } = useAccount();

  const decimals = useParadDecimals();
  const { allowance } = useParadAllowance(address);
  const { balance } = useParadBalance(address);



  const formattedPrice = useMemo(() => {
    return decimals ? price * 10 ** decimals : 0;
  }, [price, decimals]);

  const { write: approveWrite, txStatus: approveTxStatus } = useApproveWrite({
    amount: formattedPrice,
  });
  const { write: buyWrite } = useBuyNftInDisputeWrite({
    topicId,
    debateId,
    answerId,
    price: formattedPrice,
    // Temporarily hardcoding the referrer address !!!
    referrer: "0xeF0A5C14e968fd6f7090BB8E184c7e7Ed87095Df",
  });

  const handleBuyNFT = async (multiplier: number) => {
    if (balance && formattedPrice && balance >= formattedPrice * multiplier) {
      if (Number(allowance) >= formattedPrice * multiplier) {
        buyWrite();
      } else {
        approveWrite();
      }
    }
  };

  useEffect(() => {
    if (approveTxStatus === "success") {
      buyWrite();
    }
  }, [approveTxStatus]);

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
