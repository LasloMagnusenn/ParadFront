import { createConfig, http } from "@wagmi/core";
import { bscTestnet } from "@wagmi/core/chains";

export const coreConfig = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
  ssr: true,
});
