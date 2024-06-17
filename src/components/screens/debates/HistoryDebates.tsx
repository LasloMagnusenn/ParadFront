"use client";

import { useHistoryDisputesForUser } from "@/hooks/useContractData";
import { useAccount } from "wagmi";
import HistoryDebatesItems from "@/components/ui/debate/HistoryDebatesItems";

export default function HistoryDebates() {
  const { address } = useAccount();
  const data = useHistoryDisputesForUser(address);

  return <div>{<HistoryDebatesItems topics={data?.topics} debatesIndexes={data.historyDebates} />}</div>;
}
