import { useReadContract } from "wagmi";
import {
  paradAddress,
  paradABI,
  sporeABI,
  sporeAddress,
} from "@/utils/blockchain/blockchainData";
import { formatUnits } from "viem";
import { ActiveDebates, RawActiveDebates, Ref } from "@/types/referral.type";
import { useCallback, useEffect, useState } from "react";
import { debatesService } from "@/services/debates.service";
import { IDebatesData, ITopicsData } from "@/interfaces/debates.interface";
import { blockchainService } from "@/services/blockchain/blockchain.service";

export const useParadDecimals = () => {
  const { data: decimals }: { data?: number } = useReadContract({
    address: paradAddress,
    abi: paradABI,
    functionName: "decimals",
  });

  return decimals;
};

export const useParadBalance = (address?: string) => {
  const decimals = useParadDecimals();

  const { data: balance }: { data?: bigint } = useReadContract({
    address: paradAddress,
    abi: paradABI,
    functionName: "balanceOf",
    args: [address],
  });

  const formattedBalance =
    balance !== undefined && decimals !== undefined
      ? formatUnits(balance, decimals)
      : undefined;

  return { balance, formattedBalance };
};

export const useAdminWalletAddress = () => {
  const {data} = useReadContract({
    address: sporeAddress,
    abi: sporeABI,
    functionName: "adminWallet",
  });
  
  return data;
}

export const useParadAllowance = (address?: `0x${string}`) => {
  const { data: allowance }: { data?: bigint } = useReadContract({
    address: paradAddress,
    abi: paradABI,
    functionName: "allowance",
    args: [address, sporeAddress],
  });

  return { allowance };
};

export const useIsAdmin = (address?: string) => {
  const { data: adminWallet }: { data?: `0x${string}` } = useReadContract({
    address: paradAddress,
    abi: paradABI,
    functionName: "adminWallet",
  });

  return address && adminWallet ? address === adminWallet : false;
  // return true;
};

export const useIsUserInDispute = (
  topicId: number | string,
  disputeId: number | string,
  address?: string
) => {
  const { data: isInDispute }: { data?: boolean } = useReadContract({
    address: sporeAddress,
    abi: sporeABI,
    functionName: "isUserInDispute",
    args: [topicId, disputeId, address],
  });

  return isInDispute;
};

export const useGetComplexRefInfoForUser = (address?: string) => {
  const { data: refInfo }: { data?: Ref } = useReadContract({
    address: sporeAddress,
    abi: sporeABI,
    functionName: "getComplexRefInfoForUser",
    args: [address],
  });

  return refInfo;
};


// ACTIVE DEBATES
export const useGetActiveDisputesForUser = (address?: string) => {
  const { data: rawDisputes }: { data?: RawActiveDebates } = useReadContract({
    address: sporeAddress,
    abi: sporeABI,
    functionName: "getActiveDisputesForUser",
    args: [address],
  });
  
  const disputes: ActiveDebates =
    rawDisputes && rawDisputes.length
      ? rawDisputes.map((item) => {
        return {
          topicId: item[0],
          disputeId: item[1],
        }
      })
      : undefined;

  return disputes;
};

export const useActiveDisputesForUser = (address?: string) => {
  const { getFilteredTopicsAndDebates } = debatesService;
  const [topics, setTopics] = useState<ITopicsData>();
  const activeDebates = useGetActiveDisputesForUser(address);

  // const activeDebates: ActiveDebates = [
  //   {
  //     topicId: BigInt(1),
  //     disputeId: BigInt(1),
  //   },
  //   {
  //     topicId: BigInt(1),
  //     disputeId: BigInt(2),
  //   },
  //   {
  //     topicId: BigInt(2),
  //     disputeId: BigInt(1),
  //   },
  // ];

  const fetchTopics = useCallback(async () => {
    if (!activeDebates) {
      return;
    }
    const { getTopics } = blockchainService;
    const data = await getTopics();
    return await getFilteredTopicsAndDebates(activeDebates, data);
  }, [activeDebates]);

  useEffect(() => {
    const fetchData = async () => {
      const topics = await fetchTopics();
      setTopics(topics);
    };

    !topics?.topics.length && fetchData();
  }, [activeDebates, topics]);

  return {topics, activeDebates};
};



// HISTORY DEBATES
export const useGetHistoryDisputesForUser = (address?: string) => {
  const { data: rawDisputes }: { data?: RawActiveDebates } = useReadContract({
    address: sporeAddress,
    abi: sporeABI,
    functionName: "getHistoryDisputesForUser",
    args: [address],
  });
  
  const disputes: ActiveDebates =
    rawDisputes && rawDisputes.length
      ? rawDisputes.map((item) => {
        return {
          topicId: item[0],
          disputeId: item[1],
        }
      })
      : undefined;

  return disputes;
};

export const useHistoryDisputesForUser = (address?: string) => {
  const { getFilteredTopicsAndDebates } = debatesService;
  const [topics, setTopics] = useState<ITopicsData>();
  const historyDebates = useGetHistoryDisputesForUser(address);

  // const activeDebates: ActiveDebates = [
  //   {
  //     topicId: BigInt(1),
  //     disputeId: BigInt(1),
  //   },
  //   {
  //     topicId: BigInt(1),
  //     disputeId: BigInt(2),
  //   },
  //   {
  //     topicId: BigInt(2),
  //     disputeId: BigInt(1),
  //   },
  // ];

  const fetchTopics = useCallback(async () => {
    if (!historyDebates) {
      return;
    }
    const { getTopics } = blockchainService;
    const data = await getTopics();
    return await getFilteredTopicsAndDebates(historyDebates, data);
  }, [historyDebates]);

  useEffect(() => {
    const fetchData = async () => {
      const topics = await fetchTopics();
      setTopics(topics);
    };

    !topics?.topics.length && fetchData();
  }, [historyDebates, topics]);

  return {topics, historyDebates};
};



// HOT DEBATES
export const useGetHotDisputes = () => {
  const { data: rawDisputes }: { data?: RawActiveDebates } = useReadContract({
    address: sporeAddress,
    abi: sporeABI,
    functionName: "getBulkIsHotForGroups",
  });

  const disputes: ActiveDebates =
    rawDisputes && rawDisputes.length
      ? rawDisputes.map((item) => {
        return {
          topicId: item[0],
          disputeId: item[1],
        }
      })
      : undefined;

  return disputes;
};

export const useHotDisputes = () => {
  const { getFilteredTopicsAndDebates } = debatesService;
  const [topics, setTopics] = useState<ITopicsData>();
  const hotDisputes = useGetHotDisputes();

  // const activeDebates: ActiveDebates = [
  //   {
  //     topicId: BigInt(1),
  //     disputeId: BigInt(1),
  //   },
  //   {
  //     topicId: BigInt(1),
  //     disputeId: BigInt(2),
  //   },
  //   {
  //     topicId: BigInt(2),
  //     disputeId: BigInt(1),
  //   },
  // ];

  // console.log("HOT DISPUTES:", hotDisputes)


  const fetchTopics = useCallback(async () => {
    if (!hotDisputes) {
      return;
    }
    const { getTopics } = blockchainService;
    const data = await getTopics();
    return await getFilteredTopicsAndDebates(hotDisputes, data);
  }, [hotDisputes]);

  useEffect(() => {
    const fetchData = async () => {
      const topics = await fetchTopics();
      setTopics(topics);
    };

    !topics?.topics.length && fetchData();
  }, [hotDisputes, topics]);

  return {topics, hotDisputes};
};