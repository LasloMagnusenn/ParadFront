"use client";

import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import * as wallets from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import {bscTestnet} from "@wagmi/core/chains";

const walletConnectProjectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

const connectors = connectorsForWallets(
  [
    {
      groupName: "Popular Wallets",
      wallets: [
        wallets.metaMaskWallet,
        wallets.trustWallet,
        wallets.walletConnectWallet,
      ],
    },
    {
      groupName: "Other Wallets",
      wallets: [
        wallets.okxWallet,
        wallets.coinbaseWallet,
        wallets.phantomWallet,
        wallets.braveWallet,
        wallets.bitgetWallet,
        wallets.argentWallet,
        wallets.zerionWallet,
        wallets.coin98Wallet,
        wallets.safepalWallet,
        wallets.ledgerWallet,
        wallets.rainbowWallet,
        wallets.injectedWallet,
      ],
    },
  ],
  {
    appName: "App",
    projectId: walletConnectProjectId,
  }
);

export const config = createConfig({
  connectors,
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
  ssr: true,
});
