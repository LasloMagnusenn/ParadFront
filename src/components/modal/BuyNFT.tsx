"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import GreyButton from "../buttons/Grey";
import { useAccount } from "wagmi";
import styles from "@/styles/components/modal/buy-nft.module.css";
import { motion } from "framer-motion";
import { useParadBalance} from "@/hooks/useContractData";

interface BuyNFTModalProps {
    open: boolean;
    onClose: () => void;
    basePrice: number;
    formattedPrice: number;
    handleBuyNFT: (mul: number) => void;
}

export function BuyNFTModalButton(props: {
    button: React.ReactElement;
    basePrice: number;
    formattedPrice: number;
    handleBuyNFT: (mul: number) => void;
}) {
    const { basePrice, handleBuyNFT, button, formattedPrice } = props;
    const [open, setOpen] = useState(false);

    return (
        <>
            {React.cloneElement(button, {
                onClick: () => setOpen((prev) => !prev),
            })}
            <BuyNFTModal
                open={open}
                onClose={() => setOpen(false)}
                basePrice={basePrice}
                formattedPrice={formattedPrice}
                handleBuyNFT={handleBuyNFT}
            />
        </>
    );
}

export function BuyNFTModal({ open, onClose, basePrice, handleBuyNFT, formattedPrice }: BuyNFTModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const { address } = useAccount();
    const { balance } = useParadBalance(address);


    const handleSubmit = (multiplier: number) => {
        onClose?.();
        handleBuyNFT(multiplier);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                onClose?.();
            }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose?.();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);


    return open ? (
        <motion.div
            className={styles.buynft_modal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2 } }}
            exit={{ opacity: 0 }}
        >
            <div className={styles.buynft_modal__container} ref={modalRef}>
                <h2 className="purple_color">Buy NFT</h2>
                <p className={styles.buynft_modal__container__close} onClick={onClose}>
                    &times;
                </p>
                <div className={styles.buynft_modal__container__form}>

                    <div>
                        <h2>{basePrice} PARAD</h2>
                        <GreyButton
                            isActive={Boolean(balance && (balance > formattedPrice))}
                            style={{width: "100%", marginTop: 10}}
                            title="Buy x1"
                            onClick={() => handleSubmit(1)}
                        />
                    </div>

                    <div>
                        <h2>{basePrice * 2} PARAD</h2>
                        <GreyButton
                            isActive={Boolean(balance && (balance > formattedPrice * 2))}
                            style={{width: "100%", marginTop: 10}}
                            title="Buy x2"
                            onClick={() => handleSubmit(2)}
                        />
                    </div>

                    <div>
                        <h2>{basePrice * 3} PARAD</h2>
                        <GreyButton
                            isActive={Boolean(balance && (balance > formattedPrice * 3))}
                            style={{width: "100%", marginTop: 10}}
                            title="Buy x3"
                            onClick={() => handleSubmit(3)}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    ) : undefined;
}
