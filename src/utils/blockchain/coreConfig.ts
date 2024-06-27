import { createConfig, http } from "@wagmi/core";
import { bsc, bscTestnet } from "@wagmi/core/chains";


export const coreConfig = createConfig({
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
  ssr: true,
});
